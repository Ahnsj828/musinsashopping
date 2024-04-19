import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// useSearchParams 상단에 쿼리값을 찾아오는 리액트 훅
import ProductCard from "./ProductCard";
import { Container, Row, Col } from "react-bootstrap";

const ProductAll = () => {
  const [productList, setProductList] = useState([]);
  const [query, setQuery] = useSearchParams();
  // query => state 값 / setQuery => state 변수값
  // console.log(query); query는 객체다

  const searchQuery = query.get("q") || "";
  // q=재킷 q라는 key에 해당하는 value값 재킷
  // 단락회로평가
  // || 또는 => 좌항이 참이 아니더라도 넘어가라  /   || "";=> 없어도 넘어가라
  // && 좌항이 참이여야 넘어간다

  console.log(searchQuery);

  const getProducts = async () => {
    const url = ` https://my-json-server.typicode.com/Ahnsj828/musinsashopping/products?q=${searchQuery}`;
    // Ahnsj828 깃허브 아이디
    // musinsashopping 깃허브 레파지토리 이름
    const response = await fetch(url);
    const data = await response.json();
    setProductList(data);
  };
  useEffect(() => {
    getProducts();
  }, [query]);
  // 재킷을 검색하면 재킷에 매칭되는 상품들을 다시 리랜더링
  // 원피스를 검색하면 원피스에 매칭되는 상품들을 다시 리랜더링

  return (
    <Container>
      <Row>
        {productList.map((item, idx) => (
          <Col key={idx} lg={3}>
            <ProductCard item={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductAll;
