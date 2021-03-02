/* ------------------------------------------------------------
    author : fuguolin
    create:2017-09-05
    descreption:表单行提取
    ------------------------------------------------------------ */
import React,{ Component } from 'react'
import { Row, Col, Icon,Input,Form } from 'antd';
const FormItem = Form.Item;

class ColItem extends React.Component {
	render = () => {
    const self = this;
    const formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 14 } };
		return (
      <div>
        <Row>
          <Col xs={24} sm={24} md={24} lg={11} xl={11}>
            <FormItem {...formItemLayout} label={self.props.LeftColName} hasFeedback >
              {self.props.LeftItem}
            </FormItem>
          </Col>
          <Col xs={24} sm={24} md={24} lg={11} xl={11}>
            <FormItem {...formItemLayout} label={self.props.rightColName} hasFeedback >
              {self.props.rightItem}
            </FormItem>
          </Col>
        </Row>
			</div>
		);
		}
	}
module.exports = ColItem
