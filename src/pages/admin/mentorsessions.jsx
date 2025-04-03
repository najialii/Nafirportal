import React, { useState, useEffect } from 'react';
import { Table, Button, Collapse, Spin, Tag } from 'antd';
import axios from 'axios';

const { Panel } = Collapse;

const MentorSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('pending'); // Example status

  // Fetch sessions by status
  const fetchSessionsByStatus = async (status) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/sessions/status/${status}`);
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionsByStatus(status);
  }, [status]);

  // Render mentees in the collapse panel
  const renderMentees = (mentees) => {
    if (!mentees || mentees.length === 0) {
      return <p>No mentees available</p>;
    }
    return mentees.map((mentee, index) => (
      <p key={index}>
        <Tag color="blue">{mentee.name}</Tag>
      </p>
    ));
  };

  // Table columns configuration
  const columns = [
    {
      title: 'Mentor Name',
      dataIndex: 'mentorName',
      key: 'mentorName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={status === 'pending' ? 'orange' : 'green'}>{status}</Tag>,
    },
    {
      title: 'Number of Mentees',
      dataIndex: 'mentees',
      key: 'mentees',
      render: (mentees) => (mentees ? mentees.length : 0),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button type="link" onClick={() => console.log('View mentees for session:', record._id)}>
          View Mentees
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={() => setStatus('pending')} style={{ marginRight: 10 }}>
        Pending Sessions
      </Button>
      <Button onClick={() => setStatus('approved')}>
        Approved Sessions
      </Button>
      <h2>Sessions: {status}</h2>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={sessions}
          rowKey="_id"
          expandable={{
            expandedRowRender: (record) => (
              <Collapse>
                <Panel header="Mentees" key="1">
                  {renderMentees(record.requests)}
                </Panel>
              </Collapse>
            ),
            rowExpandable: (record) => record.requests && record.requests.length > 0, // Only allow expansion if mentees exist
          }}
        />
      )}
    </div>
  );
};

export default MentorSessions;
