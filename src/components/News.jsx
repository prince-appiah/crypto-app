import React, { useState } from "react";
import { Select, Typography, Row, Col, Card, Avatar } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from "services/cryptoNews";
import { useGetCryptosQuery } from "services/cryptoApi";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImg =
  "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const {
    loading,
    error,
    data: cryptoNews,
  } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const { data, isFetching, hasError } = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return <div>Loading...</div>;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={(value) => setNewsCategory(value)}
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins?.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}

      {cryptoNews?.value?.map((news, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <Card className="news-card" hoverable>
            <a href={news?.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title level={4} className="news-title">
                  {news?.name}
                </Title>
                <img
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                  src={news?.image?.thumbnail?.contentUrl || demoImg}
                  alt={news?.name}
                />
              </div>
              <p>
                {news?.description > 100
                  ? `${news?.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news?.provider[0]?.image?.thumbnail?.contentUrl || demoImg
                    }
                    alt={news?.name}
                  />
                  <Text className="provider-name">
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
