import React, { useState, useEffect } from 'react';
import { Space, Table, Card, Button } from 'antd';
import { listTemplates, createDocument } from '../../../api';
import { useNavigate } from "react-router-dom";

const TemplatesPage = () => {

  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Retrieve list of templates when page loads.
   */
  useEffect(() => {

    const populateTemplates = async () => {
      //See src/api.js file for request example
      const response = await listTemplates(); 
      setTemplates(response.data);
      setLoading(false);
    }

    populateTemplates();  

  }, [])

  /**
   * Create document from template. A document represents a filled out template.
   */
  const handleCreateDocument = async (templateIdentifier) => {

    const template = templates.find((template) => template.identifier === templateIdentifier); 

    /**
     * Create document from template. A document represents a filled out template.
     */
    const newDocPayload = {
      /**
       * VERY IMPORTANT to add template property. 
       *
       * * This links the document to the template
       * * This will add a source proeprty to the document that links back to the template identifier.
       */
      template: template.identifier, 
      name: template.name,
      files: template.files
    };

    const doc = await createDocument(newDocPayload); 

    const sourceTemplateIdentifier = doc.source; //Document source links back to the original template identifier
    const docIdentifier = doc.identifier; 

    navigate(`/templates_demo/${sourceTemplateIdentifier}/documents/${docIdentifier}`)

  }

  const dataSource = templates.map((template) => {
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
