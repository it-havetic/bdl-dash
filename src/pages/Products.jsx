import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

const Products = () => {
  return (
    <Layout>
      <Content
        className="gap-4"
        style={{ padding: "20px 10px", display: "flex" }}
      >
        <div style={{ flex: 1 }}>
          <ProductForm />
        </div>
        <div style={{ flex: 3 }}>
          <ProductList />
        </div>
      </Content>
    </Layout>
  );
};

export default Products;
