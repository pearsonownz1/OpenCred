import express from 'express';
import {
    getAllEvaluationRequests,
    getAllEvaluationResults,
} from './operations/list';
import { createEvaluationRequest, createOrUpdateEvaluationResult } from './operations/create';
import { getEvaluationRequestById, getEvaluationResultById } from './operations/get-by-id';

const router = express.Router();

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

export default router;