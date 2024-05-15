'use client'

import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Space, Typography } from 'antd'
import { createSlot } from '@/lib/actions'
import TagEditor from '@/app/components/TagEditor'
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'

const Body = ({ deviceData, initValues }) => {
  const [form] = Form.useForm()
  const slotsConfig = Form.useWatch([], form)
  const onFinish = async (values) => {
    if (typeof (values) !== 'undefined') await createSlot(values)
  }
  const [tags, setTags] = useState({})

  const setDeviceTags = (device, key) => {
    return (vtags) => {
      const tagsState = {
        ...tags,
        [key]: { ...tags[key], [device]: [...vtags] },
      }
      const fieldsValue = form.getFieldsValue()
      fieldsValue.slots[key]['sizeMapping'] = tagsState[key]
      form.setFieldsValue(fieldsValue)
      setTags((tags)=> ({ ...tags, [key]: { ...tags[key], [device]: [...vtags] } }))
    }
  }
  useEffect(() => {
    initValues.slots.forEach((item, index) => {
      deviceData.devices.forEach(({ name }) => {
        // debugger
        setDeviceTags(name, index)(item['sizeMapping'][name])
      })
    })

  }, [])

  return (
    <>
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
        initialValues={initValues}
        onFinish={onFinish}
      >
        <Form.List name="slots">
          {(subFields, subOpt) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: 16,
              }}
            >
              {subFields.map((subField) => (
                <Space key={subField.key}>
                  <Form.Item label={'name'} name={[subField.name, 'name']}>
                    <Input placeholder="name"/>
                  </Form.Item>
                  <Form.Item label={'Ad unit'} name={[subField.name, 'adUnit']}>
                    <Input placeholder="Ad unit"/>
                  </Form.Item>
                  {deviceData?.devices.map(({ name, viewPort }) => {
                    return <Form.Item key={name}
                                      label={`${name} ${viewPort}`}>

                      <TagEditor tags={tags[subField.key]?.[name] || []}
                                 setTags={setDeviceTags(name,
                                   subField.key)}></TagEditor>
                    </Form.Item>
                  })}
                </Space>
              ))}
              <Button type="dashed" onClick={() => subOpt.add()}
                      block>
                + Add Sub Item
              </Button>
            </div>
          )}
        </Form.List>
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
      </Form>
      <JsonView src={slotsConfig} customizeCopy={(node) => {
        if (Object.keys(node).includes('slots', 'devices')) {
          return navigator.clipboard.writeText(
            `const slotsConfig=${JSON.stringify(node, null, 2)}`)
        }
        return navigator.clipboard.writeText(
          JSON.stringify(node, null, 2))
      }}/>
    </>
  )
}

export default Body