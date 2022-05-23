import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Form, Input, Checkbox, Button } from "antd";
import {
  MailOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import VerifyCode from "../../components/VerifyCode";
import styles from "./Login.module.less";

function Login() {
  const [form] = Form.useForm();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const [verifyImgCode, setVerifyImgCode] = useState();

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      e.key === "Enter" && form.validateFields();
    });
  }, [form]);
  const onVerifyCodeChange = (code) => {
    setVerifyImgCode(code);
  };

  async function handleSubmit(e) {
    try {
      setError("");
      setLoading(true);
      await login(e.userEmail, e.password);
      history("/");
    } catch (error) {
      console.log(error.message);
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <div className={styles.loginBox}>
      <Form
        name="normal_login"
        className={styles.loginForm}
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
        form={form}
      >
        <section className={styles.logo}>
          <span className={styles.name}>Log In</span>
        </section>
        {error && (
          <Alert message="Error Text" type="error" description={error} />
        )}
        <Form.Item
          name="userEmail"
          rules={[
            {
              required: true,
              message: "Please enter your email",
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
              message: "Please enter your password",
            },
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Password"
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
            Log In
          </Button>
        </Form.Item>
        <Form.Item>
          Need an account?
          <Button type="link">
            <Link to="/register">Press here</Link>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
