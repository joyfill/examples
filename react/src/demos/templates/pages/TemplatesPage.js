import React, { useState, useEffect } from 'react';
import { Alert, Space, Table, Card, Button } from 'antd';
import { listTemplates, createDocument } from '../../../api';
import { useNavigate } from "react-router-dom";
import { getDocumentFromTemplate } from '@joyfill/components';

/**
 * Overview
 *
 * - This page retrieves and display a list of your Joyfill Templates. 
 * - Once all templates are displayed you can view associated documents and 
 *   or generate a new document. See the difference between templates and 
 *   documents here: https://docs.joyfill.io/docs/key-terminology#template-vs-document
 *
 */
const TemplatesPage = () => {

  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Retrieve list of your templates when page loads.
   */
  useEffect(() => {

    const handleListTemplates = async () => {
      const response = await listTemplates(); 
      if (response) setTemplates(response.data);
      setLoading(false);
    }

    handleListTemplates();  

  }, [])

  /**
   * Create document from template. A document represents a filled out template.
   */
  const handleCreateDocument = async (templateIdentifier) => {

    const template = templates.find((template) => template.identifier === templateIdentifier); 

    /**
     * Step 1: Generate a document payload from the template using 
     * the Joyfill helper method getDocumentFromTemplate.
     */
    const newDocPayload = getDocumentFromTemplate(template);
    const doc = await createDocument(newDocPayload); 

    /**
     * Step 2: Get navigation parameters from the newly created document.
     *
     * - document.source links to the original associated template identifier
     * - document.identifier the identifier of the new document 
     */
    const sourceTemplateIdentifier = doc.source; //
    const docIdentifier = doc.identifier; 

    /**
     * Step 3: Navigate to the newly created document
     */
    navigate(`/templates_demo/${sourceTemplateIdentifier}/documents/${docIdentifier}`)

  }

  if (!templates) return (
    <div style={{padding: '24px'}}>
      <Alert
        message="No Templates Loading"
        description="Please complete the required steps documented in README file"
        type="warning"
      />
    </div>
  );

  const dataSource = templates?.map((template) => {
    return {
      key: template.identifier,
      id: template.identifier,
      identifier: template.identifier,
      name: template.name,
      stage: template.stage,
      createdOn: new Date(template.createdOn).toString()
    }
  });

  return (
    <div style={{padding: '12px'}}>
      <h1>Templates</h1>
      <Card>
        <Table 
          size="middle"
          loading={loading}
          dataSource={dataSource} 
          pagination={false}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                event.preventDefault();
              },
            };
          }}
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
              title: 'Stage',
              dataIndex: 'stage',
              key: 'stage',
              render: (text, record, index) => {
                return text
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

                const templateIdentifier = record.identifier;

                return (
                  <div>
                    <Space>
                      <Button 
                        shape="round" 
                        onClick={() => handleCreateDocument(templateIdentifier)}
                      >
                        Fill Out 
                      </Button>
                      <Button 
                        shape="round" 
                        onClick={() => {
                          navigate(`/templates_demo/${templateIdentifier}/documents`)
                        }}
                      >
                        View Documents
                      </Button>
                    </Space>
                  </div>
                );
              }
            }
          ]} 
        />
      </Card>
    </div>
  ); 

}

export default TemplatesPage;
