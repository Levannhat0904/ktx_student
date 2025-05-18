import React from "react";
import { Card, Row, Col, Skeleton, Space } from "antd";

const LoadingRoom = () => {
  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Room Header Loading */}
      <Card className="shadow-md">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={16}>
            <Space direction="vertical" size="small" className="w-full">
              <Skeleton.Input style={{ width: '100%', height: 40 }} active size="large" />
              <Skeleton.Input style={{ width: '80%', height: 24 }} active />
            </Space>
          </Col>
          <Col xs={24} md={8} className="text-right">
            <Skeleton.Button style={{ width: 120, height: 32 }} active shape="round" />
          </Col>
        </Row>
      </Card>

      {/* Room Stats and Details Loading */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card className="shadow-md">
            <Space direction="vertical" size="large" className="w-full">
              <Skeleton.Input style={{ width: '60%', height: 24 }} active />
              <div>
                <Skeleton.Input style={{ width: '40%', height: 20 }} active />
                <Skeleton.Input style={{ width: '70%', height: 32 }} active className="mt-2" />
              </div>
              <div>
                <Skeleton.Input style={{ width: '40%', height: 20 }} active />
                <Skeleton.Input style={{ width: '70%', height: 32 }} active className="mt-2" />
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={16}>
          <Card className="shadow-md">
            <Space direction="vertical" size="middle" className="w-full">
              <Skeleton.Input style={{ width: '40%', height: 32 }} active />
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Skeleton.Input style={{ width: '90%', height: 24 }} active />
                  <Skeleton.Input style={{ width: '70%', height: 24 }} active className="mt-2" />
                </Col>
                <Col xs={24} sm={12}>
                  <Skeleton.Input style={{ width: '90%', height: 24 }} active />
                  <Skeleton.Input style={{ width: '70%', height: 24 }} active className="mt-2" />
                </Col>
              </Row>
              <div className="mt-4">
                <Skeleton.Input style={{ width: '30%', height: 24 }} active />
                <div className="flex gap-2 mt-2">
                  <Skeleton.Button style={{ width: 80, height: 32 }} active shape="round" />
                  <Skeleton.Button style={{ width: 80, height: 32 }} active shape="round" />
                  <Skeleton.Button style={{ width: 80, height: 32 }} active shape="round" />
                </div>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Residents List Loading */}
      <Card className="shadow-md">
        <Skeleton.Input style={{ width: 200, marginBottom: 24 }} active size="large" />
        <Space direction="vertical" size="large" className="w-full">
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex items-start gap-4">
              <Skeleton.Avatar active size={64} />
              <div className="flex-1">
                <Space className="w-full justify-between">
                  <Skeleton.Input style={{ width: 150 }} active />
                  <Skeleton.Button style={{ width: 100 }} active shape="round" />
                </Space>
                <div className="mt-2">
                  <Skeleton.Input style={{ width: '60%' }} active />
                </div>
                <div className="mt-1">
                  <Skeleton.Input style={{ width: '40%' }} active />
                </div>
              </div>
            </div>
          ))}
        </Space>
      </Card>
    </div>
  );
};

export default LoadingRoom; 