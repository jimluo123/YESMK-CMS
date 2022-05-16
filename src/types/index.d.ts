import { type } from "os";
import { ReactElement, ReactNode, ReactChildren } from "react";

/**
 * 分页参数
 */
export interface PaginationType {
  current?: number;
  pageSize?: number | undefined;
  total?: number;
  pageSizeOptions?: string[];
  showQuickJumper?: boolean;
  showSizeChanger?: boolean;
  position?: TablePaginationPosition[];
  noPagination?: boolean; // 不分页
  hidePagination?: boolean; // 隐藏分页器
  updateTable?(): void;
}

/**
 * 表格参数
 */
export interface TableProps {
  rowKey: string;
  columns: {}[]; // 表头
  fetchApi?: any; // 表格列表api
  queryParams?: any; // 搜索参数
  refreshOutside?: boolean; // 从父组件刷新
  handleTableList?(list: any[]): any[]; // 处理表格数据
  pagination?: PaginationType;
  rowSelection?: {}; // 选择操作
}

/**
 * BodyCard组件参数
 */
export interface BodyCardProps {
  title?: string;
  subTitle?: string;
  extra?: ReactNode;
  children: ReactNode;
  showFooter?: boolean;
  onSubmit?(values: any): void;
  onRefresh?(): void;
}

/**
 * 上传组件参数
 */
export interface UploadProps {
  className?: any;
  fileList: any[];
  accept?: string;
  handleRemove?(newFileList: any): void;
  handleUpload?(file: any): void;
}

/**
 * 富文本组件参数
 */
export interface RichTextProps {
  value?: any;
  onChange(value: any): any;
}

/**
 * 验证码组件参数
 */
export type VerifyCodeProps = {
  width?: number;
  height?: number;
  length?: number;
};

/**
 * 用户信息
 */
export interface UserInfo {
  userId?: number;
  avatar?: string;
  userName?: string;
  nickName?: string;
  phone?: string;
  email?: string;
}

/**
 * 下拉列表项
 */
export interface OptionType {
  label: string;
  value: number | string;
}

/**
 * 搜索面板项
 */
export interface SearchItemType {
  type: string;
  field: string;
  label?: string;
  initialValue?: any;
  options?: any[];
  placeholder?: string;
}

/**
 * 订单
 */
export interface OrderType {
  key?: number;
  orderId?: number;
  orderNo: number | null;
  orderStatus?: string;
  paymentStatus?: number;
  paymentType?: number;
  paymentTime?: string;
}

/**
 * 订单详情
 */
export interface OrderDetail {
  orderId: number;
  orderNo: number | null;
  orderStatus: string;
  orderCoupon: number;
  paymentStatus: number;
  paymentType: number;
  paymentTime: string;
  createTime: string;
  orderPrice: number;
  goodsList: GoodsType[];
  address: any;
}

/**
 * 商品
 */
export interface GoodsType {
  key?: number;
  goodsId: number;
  goodsDesc: string;
  goodsImage: string;
  goodsStatus: string;
  goodsPrice: number;
  goodsStock: number;
  createTime: string;
}

// 客户
export interface customer {
  id: string;
  name: string;
  account: string;
  password: string;
  avatar: string;
  isPro: boolean;
  credit: number;
  address: string;
  create_time: number;
  modified_time: number;
}

// 商铺
export interface store {
  id: string;
  name: string;
  description: string;
  avatar: string;
  create_time: number;
  modified_time: number;
}

// 商品
export interface product {
  id: string;
  store_id: string;
  name: string;
  pictures: Array<string>;
  category: string;
  price: number;
  isPublished: boolean;
  description: string;
  stock: number;
  create_time: number;
  modified_time: number;
}

// 订单
export interface order {
  id: string;
  state: number;
  total: number;
  discounted_price: number;
  payment: string;
  customer_id: string;
  customer_name: string;
  customer_phone_number: string;
  customer_address: string;
  product_id: string;
  product_counts: number;
  product_price_each: number;
  create_time: number;
  modified_time: number;
}

// 积分
export interface credit {
  id: string;
  customer_id: string;
  credit_flow: number;
  create_time: number;
  modified_time: number;
}
