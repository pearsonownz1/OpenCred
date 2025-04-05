import express from 'express';
import {
    getAllEvaluationRequests,
    getAllEvaluationResults,
    getAllRevisions,
} from './operations/list';
import { createEvaluationRequest, createOrUpdateEvaluationResult, createRevision } from './operations/create';
import { getEvaluationRequestById, getEvaluationResultById, getRevisionById } from './operations/get-by-id';
import { updateRevisionStatus } from './operations/update';
import { evaluateCredentials } from './operations/create';

const router = express.Router();


router.post('/evaluate', async (req, res) => {
    try {
      const evaluationData = req.body;
      const { provider } = req.body;
      
      // Basic validation
      if (!evaluationData.studentId || !evaluationData.sourceCountry || 
          !evaluationData.program || !evaluationData.institution || 
          !evaluationData.evaluationType) {
        return res.status(400).json({ error: 'Missing required evaluation fields' });
      }
      
      const result = await evaluateCredentials(evaluationData, provider);
      res.json(result);
    } catch (error) {
      console.error('Evaluation error:', error);
      res.status(500).json({
        error: 'Failed to process evaluation request',
        details: error instanceof Error ? error.message : String(error)
      });
    }
  });

router.get('/requests', async (req, res) => {
    try {
        const evaluationRequests = await getAllEvaluationRequests();
        res.json(evaluationRequests);
    } catch (error) {
        console.error('Error fetching evaluation requests:', error);
        res.status(500).json({ error: 'Failed to fetch evaluation requests' });
    }
});

router.get('/requests/:id', async (req, res) => {
    try {
        const evaluationRequest = await getEvaluationRequestById(req.params.id);
        if (!evaluationRequest) {
            return res.status(404).json({ error: 'Evaluation request not found' });
        }
        res.json(evaluationRequest);
    } catch (error) {
        console.error('Error fetching evaluation request:', error);
        res.status(500).json({ error: 'Failed to fetch evaluation request' });
    }
});

router.post('/requests', async (req, res) => {
    try {
        const evaluationRequest = await createEvaluationRequest(req.body);
        res.status(201).json(evaluationRequest);
    } catch (error) {
        console.error('Error creating evaluation request:', error);
        res.status(500).json({ error: 'Failed to create evaluation request' });
    }
});

router.get('/results', async (req, res) => {
    try {
        const evaluationResults = await getAllEvaluationResults();
        res.json(evaluationResults);
    } catch (error) {
        console.error('Error fetching evaluation results:', error);
        res.status(500).json({ error: 'Failed to fetch evaluation results' });
    }
});

router.get('/results/:id', async (req, res) => {
    try {
        const evaluationResult = await getEvaluationResultById(req.params.id);
        if (!evaluationResult) {
            return res.status(404).json({ error: 'Evaluation result not found' });
        }
        res.json(evaluationResult);
    } catch (error) {
        console.error('Error fetching evaluation result:', error);
        res.status(500).json({ error: 'Failed to fetch evaluation result' });
    }
});

router.put('/results/:requestId', async (req, res) => {
    try {
        const evaluationResult = await createOrUpdateEvaluationResult(req.params.requestId, req.body);
        res.json(evaluationResult);
    } catch (error) {
        console.error('Error updating evaluation result:', error);
        res.status(500).json({ error: 'Failed to update evaluation result' });
    }
});

router.get('/revisions', async (req, res) => {
    try {
        const revisions = await getAllRevisions();
        res.json(revisions);
    } catch (error) {
        console.error('Error fetching revisions:', error);
        res.status(500).json({ error: 'Failed to fetch revisions' });
    }
});

router.get('/revisions/:id', async (req, res) => {
    try {
        const revision = await getRevisionById(req.params.id);
        if (!revision) {
            return res.status(404).json({ error: 'Revision not found' });
        }
        res.json(revision);
    } catch (error) {
        console.error('Error fetching revision:', error);
        res.status(500).json({ error: 'Failed to fetch revision' });
    }
});

router.post('/revisions', async (req, res) => {
    try {
        const revision = await createRevision(req.body);
        res.status(201).json(revision);
    } catch (error) {
        console.error('Error creating revision:', error);
        res.status(500).json({ error: 'Failed to create revision' });
    }
});

router.put('/revisions/:id/status', async (req, res) => {
    try {
        const updatedRevision = await updateRevisionStatus(req.params.id, req.body.status);
        res.json(updatedRevision);
    } catch (error) {
        console.error('Error updating revision status:', error);
        res.status(500).json({ error: 'Failed to update revision status' });
    }
});

export default router;