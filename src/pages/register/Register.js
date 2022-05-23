import React, { useState, useEffect } from "react";
import styles from "./Register.module.less";
import VerifyCode from "../../components/VerifyCode";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";

import { Alert, Form, Input, Checkbox, Button } from "antd";
import {
  MailOutlined,
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

const Register = () => {
  const [form] = Form.useForm();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const [verifyImgCode, setVerifyImgCode] = useState();
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      e.key === "Enter" && form.validateFields();
    });
  }, [form]);
  const onVerifyCodeChange = (code) => {
    setVerifyImgCode(code);
  };

  async function handleSubmit(e) {
    console.log(e);
    try {
      setError("");
      setLoading(true);
      if (e.password.length < 6) {
        setError("password must at leat 6 ");
        throw error;
      }
      if (e.password !== e.confirmPassword) {
        setError("confirm password should be the same as password");
        throw error;
      }
      await signup(e.userEmail, e.password);
      addDoc(usersCollectionRef, {
        name: e.userName,
        type: 1,
        account: e.userEmail,
        password: e.password,
        awatar: "",
        isPro: true,
        credit: 0,
        address: "",
        description: "",
        phone_number: "",
        visited_times: 0,
        create_time: Timestamp.now(),
        modified_time: Timestamp.now(),
      });
      history("/");
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  }

  return (
    <div className={styles.loginBox}>
      <Form
        form={form}
        name="normal_login"
        className={styles.loginForm}
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
      >
        <section className={styles.logo}>
          <span className={styles.name}>Register</span>
        </section>
        {error && (
          <Alert message="Error Text" type="error" description={error} />
        )}
        <Form.Item
          name="userName"
          rules={[
            {
              required: true,
              message: "Please enter your name or store's name",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="user name"
          />
        </Form.Item>
        <Form.Item
          name="userEmail"
          rules={[
            {
              required: true,
              message: "Please enter email",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter password",
            },
          ]}
        >
          <Input.Password
            size="large"
            placeholder="password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please enter password again for confirming",
            },
          ]}
        >
          <Input.Password
            size="large"
            placeholder="confirmed password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: "10px" }}>
          <Input.Group className={styles.verify}>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="verifyCode"
              rules={[
                {
                  validateTrigger: "onBlur",
                  validator: (_, value) =>
                    !value
                      ? Promise.reject(new Error("请输入验证码"))
                      : value.toLocaleLowerCase() !==
                        verifyImgCode?.toLocaleLowerCase()
                      ? Promise.reject(new Error("验证码不正确"))
                      : Promise.resolve(),
                },
              ]}
            >
              <Input
                className={styles.verifyInput}
                size="large"
                placeholder="verify code"
                maxLength={4}
                prefix={<SafetyCertificateOutlined />}
              />
            </Form.Item>
            <VerifyCode
              width={120}
              height={40}
              length={4}
              change={onVerifyCodeChange}
            />
          </Input.Group>
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>remember?</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
            block
          >
            Register
          </Button>
        </Form.Item>
        <Form.Item>
          Already have an account?
          <Button type="link">
            <Link to="/login">Press here</Link>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;
