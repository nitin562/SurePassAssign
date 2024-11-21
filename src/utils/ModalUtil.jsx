import { Button } from 'antd'
import Modal from 'antd/es/modal/Modal'
import React from 'react'

export default function ModalUtil({title,content,show,setshow,custom=null}) {
    const close=()=>{
        if(custom){
            custom()
        }
        setshow(false)
    }
  return (
    <Modal open={show} title={title} onOk={close} onCancel={close} footer={[
        <Button type='primary' onClick={close}>Ok</Button>
    ]}>
        {content}
    </Modal>
  )
}
