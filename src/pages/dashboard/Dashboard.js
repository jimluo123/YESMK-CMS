import React, { useState, useRef } from "react";
import { Row, Col, Statistic } from "antd";
import styles from "./Dashboard.module.less";
import {
  ArrowUpOutlined,
  ShoppingCartOutlined,
  PayCircleOutlined,
  UsergroupAddOutlined,
  LineChartOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Table from "../../components/Table";

const Dashboard = () => {
  const salesRef = useRef(null);
  const salesChartRef = useRef(null);
  const distributedRef = useRef(null);
  const distributedChartRef = useRef(null);

  const [refresh] = useState();
  const [queryParams] = useState({});
  return (
    <div>
      <Row className={styles.row} gutter={20} style={{ marginTop: "20px" }}>
        <Col span={6}>
          <div className={`${styles.tagItem} ${styles.order}`}>
            <Statistic
              title="今日订单"
              value={2757}
              valueStyle={{ color: "#1488ee" }}
            />
            <div className={styles.tagIcon}>
              <ShoppingCartOutlined />
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className={`${styles.tagItem} ${styles.income}`}>
            <Statistic
              title="今日收入"
              value={9699}
              precision={2}
              valueStyle={{ color: "#e9445d" }}
              prefix="￥"
            />
            <div className={styles.tagIcon}>
              <PayCircleOutlined />
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className={`${styles.tagItem} ${styles.guest}`}>
            <Statistic
              title="今日访客"
              value={29}
              valueStyle={{ color: "#ff7a4e" }}
              prefix={<PlusOutlined />}
            />
            <div className={styles.tagIcon}>
              <UsergroupAddOutlined />
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className={`${styles.tagItem} ${styles.transfer}`}>
            <Statistic
              title="转化率"
              value={78.6}
              precision={2}
              valueStyle={{ color: "#61b977" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
            <div className={styles.tagIcon}>
              <LineChartOutlined />
            </div>
          </div>
        </Col>
      </Row>
      <Row className={styles.row} gutter={20}>
        <Col span={14}>
          <div className={styles.card}>
            <header>销售概况</header>
            <section ref={salesRef}>
              <div ref={salesChartRef} className={styles.chart}></div>
            </section>
          </div>
        </Col>
        <Col span={10}>
          <div className={styles.card}>
            <header>销售分布</header>
            <section ref={distributedRef}>
              <div ref={distributedChartRef} className={styles.chart}></div>
            </section>
          </div>
        </Col>
      </Row>
      <Row className={styles.row} gutter={20}>
        <Col span={24}>
          <div className={styles.card}>
            <header>最新订单</header>
            <Table
              rowKey="orderId"
              //columns={columns}
              //fetchApi={getOrders}
              queryParams={queryParams}
              refreshOutside={refresh}
              pagination={{ noPagination: true }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
