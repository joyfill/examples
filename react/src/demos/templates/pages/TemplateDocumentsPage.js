import React, { useState, useEffect } from 'react';
import { Card, Space, Table, Button } from 'antd';
import { listDocumentsForTemplate } from '../../../api';
import { useNavigate, useParams } from "react-router-dom";

const TemplateDocumentsPage = () => {

  /**
   * Step 1: Retrieve templateIdentifier from url param to list associated documents
   */
  const { templateIdentifier } = useParams(); 
  const navigate = useNavigate(); 

  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Step 2: Retrieve list of documents associated with the template from api
   */
  useEffect(() => {

    const populateTemplateDocuments = async () => {
      //See src/api.js file for request example
      const response = await listDocumentsForTemplate(templateIdentifier); 
      setDocs(response.data);
      setLoading(false);
    }

    populateTemplateDocuments();  

  }, [templateIdentifier]);

  const columns = [];
  const rows = [];

  /**
   * Step 3: Review list of filled template data
   */
  docs.forEach((doc, i) => {

    /**
     * Step 3.1: Create list of field columns. All documents associated with
     * the same template will have the same fields (columns) so we
     * only need to generate the columns based on the first document.
     */
    if (i === 0 && columns.length < 1) {
      doc.fields.forEach((field) => {
        columns.push({
          title: field.title,
          dataIndex: field._id,
          key: field._id,
          render: (text) => text
        })
      })
    }

    /**
     * Step 3.2: Create list of rows to display the filled out template data.
     */
    const row = {
      key: doc._id,
      id: doc._id,
      identifier: doc.identifier,
      source: doc.source, //Source links to templateIdentifier
    };

    doc.fields.forEach((field) => {

      /**
       * Step 3.3: We recommned that you check the field.type to properly
       * format the value for display based on its type.
       */
      row[field._id] = field.value || (<i>Empty</i>); 

    })

    rows.push(row);

  })

  return (
    <div style={{padding: '12px'}}>
      <h1>Template Documents</h1>
      <Card>
        <Table 
          size="middle"
          loading={loading}
          columns={[
            ...columns,
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
          dataSource={rows} 
          pagination={false}
        />
      </Card>
    </div>
  ); 

}

export default TemplateDocumentsPage;
