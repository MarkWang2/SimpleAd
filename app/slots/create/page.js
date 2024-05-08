'use client'

import React, { useEffect } from 'react'
import useSWR from 'swr'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space, Typography } from 'antd'
import { createDevice } from '@/lib/actions'

const App = () => {
  const [form] = Form.useForm()
  const fetcher = (url) => fetch(url).then((r) => r.json())
  const { data } = useSWR('/api/devices', fetcher)

  const onFinish = async (values) => {
    await createDevice(values.devices)
  }

  return (
    <Form
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
      }}
      form={form}
      name="dynamic_form_complex"
      style={{
        maxWidth: 600,
      }}
      autoComplete="off"
      onFinish={onFinish}
    >
      {data?.devices.map((device) => {
        return <Form.Item key={device.name} label={`${device.name} ${device.viewPort}`} >


        </Form.Item>
      })}

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Save
        </Button>

        <Button type="default" htmlType="submit">
          Discard
        </Button>
      </Form.Item>

      <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>
    </Form>
  )
}
export default App