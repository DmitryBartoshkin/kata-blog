import { Form, Input, Button } from 'antd'

export default function FormForArticle({ onFinish, article = { title: '', description: '', body: '', tagList: [] } }) {
  const { title, description, body, tagList } = article

  return (
    <Form
      name="basic"
      layout="vertical"
      requiredMark={false}
      autoComplete="off"
      onFinish={onFinish}
      initialValues={{
        title,
        description,
        body,
        tagList,
      }}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[
          {
            required: true,
            message: 'Please input your Title!',
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="Title" size="large" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Short description"
        rules={[
          {
            required: true,
            message: 'Please input your Description!',
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="Description" size="large" />
      </Form.Item>

      <Form.Item
        name="body"
        label="Text"
        rules={[
          {
            required: true,
            message: 'Please input your Text',
            whitespace: true,
          },
        ]}
      >
        <Input.TextArea placeholder="Text" rows={7} size="large" />
      </Form.Item>

      <Form.List name="tagList">
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item label={index === 0 ? 'Tags' : ''} required={false} key={field.key} className="tag-group">
                <Form.Item
                  key={field.key}
                  isListField={field.isListField}
                  name={field.name}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      whitespace: false,
                    },
                  ]}
                >
                  <Input placeholder="Tag" size="large" />
                </Form.Item>
                <Button onClick={() => remove(field.name)} danger size="large">
                  Delete
                </Button>
              </Form.Item>
            ))}
            <Form.Item className="btn-add">
              <Button onClick={() => add()} ghost type="primary" size="large">
                Add tag
              </Button>

              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" className="btn-send">
          Send
        </Button>
      </Form.Item>
    </Form>
  )
}
