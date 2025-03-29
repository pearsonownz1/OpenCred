import React from 'react';
import { Card, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;

interface Course {
  name: string;
  credits: number;
  grade: string;
  equivalent: string;
  status: 'approved' | 'pending' | 'rejected';
}

interface EvaluationResult {
  gpa: {
    original: number;
    converted: number;
    scale: string;
  };
  courses: Course[];
  summary: string;
  recommendations: string[];
}

interface EvaluationResultsProps {
  result: EvaluationResult;
}

const EvaluationResults: React.FC<EvaluationResultsProps> = ({ result }) => {
  const columns: ColumnsType<Course> = [
    {
      title: 'Course',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Credits',
      dataIndex: 'credits',
      key: 'credits',
    },
    {
      title: 'Original Grade',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: 'Equivalent',
      dataIndex: 'equivalent',
      key: 'equivalent',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          approved: 'green',
          pending: 'orange',
          rejected: 'red',
        };
        return <Tag color={colors[status as keyof typeof colors]}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <Title level={4}>GPA Summary</Title>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <Text type="secondary">Original GPA</Text>
            <div className="text-xl font-bold">{result.gpa.original}</div>
          </div>
          <div>
            <Text type="secondary">Converted GPA</Text>
            <div className="text-xl font-bold">{result.gpa.converted}</div>
          </div>
          <div>
            <Text type="secondary">Scale</Text>
            <div className="text-xl font-bold">{result.gpa.scale}</div>
          </div>
        </div>
      </Card>

      <Card>
        <Title level={4}>Course Evaluation</Title>
        <Table
          columns={columns}
          dataSource={result.courses}
          rowKey="name"
          pagination={false}
        />
      </Card>

      <Card>
        <Title level={4}>Summary</Title>
        <Text>{result.summary}</Text>
      </Card>

      <Card>
        <Title level={4}>Recommendations</Title>
        <ul className="list-disc list-inside space-y-2">
          {result.recommendations.map((rec, index) => (
            <li key={index}>
              <Text>{rec}</Text>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default EvaluationResults; 