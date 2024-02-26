import React, { useState, useEffect } from 'react';
import { Alert, Card, Space, Table, Button } from 'antd';
import { listDocumentsForTemplate } from '../../../api';
import { useNavigate, useParams } from "react-router-dom";

/**
 * Overview
 *
 * - This page retrieves and displays all documents associated with a template.
 */
const TemplateDocumentsPage = () => {

  /**
   * Step 1: Retrieve templateIdentifier from url param to list associated documents
   */
  const { templateIdentifier } = useParams(); 
  const navigate = useNavigate(); 

  const [ docs, setDocs ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  /**
   * Step 2: Retrieve list of documents associated with the template from api
   */
  useEffect(() => {

    const handleListTemplateDocuments = async () => {
      const response = await listDocumentsForTemplate(templateIdentifier); 
      if (response) setDocs(response.data);
      setLoading(false);
    }

    handleListTemplateDocuments();  

  }, [templateIdentifier]);

  if (!docs) return (
    <div style={{padding: '24px'}}>
      <Alert
        message="No Documents Found"
        description="Fill out templates to create documents."
        type="info"
      />
    </div>
  );

  const rows = [];

  docs?.forEach((doc, i) => {

    rows.push({
      key: doc._id,
      id: doc._id,
      name: doc.name,
      identifier: doc.identifier,
      source: doc.source, //Source links to templateIdentifier
      createdOn: new Date(doc.createdOn).toString()
    });

  })

  return (
    <div style={{padding: '12px'}}>
      <h1>Template Documents</h1>
      <Card>
        {rows.length < 1 ? null : (
          <Table 
            size="middle"
            loading={loading}
            dataSource={rows} 
            columns={[
              {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: (text, record, index) => {
                  return text;
                }
              },
              {
                title: 'Identifier',
                dataIndex: 'identifier',
                key: 'identifier',
                render: (text, record, index) => {
                  return text;
                }
              },
              {
                title: 'Created',
                dataIndex: 'createdOn',
                key: 'createdOn',
                render: (text, record, index) => {
                  return text;
                }
              },
              {
                title: '',
                dataIndex: 'actions',
                key: 'id',
                render: (id, record, index) => {

                  const templateIdentifier = record.source;
                  const docIdentifier = record.identifier;

                  return (
                    <div>
                      <Space>
                        <Button 
                          shape="round" 
                          onClick={() => {
                            navigate(`/templates_demo/${templateIdentifier}/documents/${docIdentifier}`)
                          }}
                        >
                          View
                        </Button>
                      </Space>
                    </div>
                  );
                }
              }
            ]}
            pagination={false}
          />
        )}
      </Card>
    </div>
  ); 

}

export default TemplateDocumentsPage;
