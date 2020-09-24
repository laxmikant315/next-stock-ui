import React, { useEffect, useState } from "react";
import {
  Row,
  Skeleton,
  Col,
  Button,
  Badge,
  Card,
  Input,
  Popover,
  Descriptions,
  Form,
  Switch,
} from "antd";

import Chart from "react-apexcharts";
import { Para, StocksStyle, CalculatedQuantityStyle } from "./stocks.styles";

import { LikeTwoTone, SlidersTwoTone } from "@ant-design/icons";
import moment from "moment";

import { Formik } from "formik";

const StockContent = ({ stockDetails }: any) => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([
    {
      name: "Desktops",
      data: [1, 2, 3, 4],
    },
  ]);

  const chart = {
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },

      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [1, 2, 3, 4],
      },
    },
  };
  const colors = ["#5fa3f0", "#f0e15f", "#5fe48a"];
  const [bar, setBarData] = useState({
    series: [
      {
        data: [0, 0, 0],
      },
    ],
    options: {
      chart: {
        height: 100,
        type: "bar",
        events: {
          click: function (chart: any, w: any, e: any) {
            console.log(chart, w, e);
          },
        },
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: "top",
      },
      xaxis: {
        categories: ["Avarage", "Allowed", "Today"],
        labels: {
          style: {
            colors: colors,
            fontSize: "14px",
          },
        },
      },
    },
  });

  useEffect(() => {
    const getData = async () => {
      if (stockDetails) {
        setLoading(false);
        const { highestHigh, lowestLow, high, low } = stockDetails;
        let indexes: number[] = [
          highestHigh.indexNo,
          lowestLow.indexNo,
          high.indexNo,
          low.indexNo,
        ];

        indexes = indexes.sort((x, y) => x - y);

        const final: any[] = [];
        for (const i of indexes) {
          if (highestHigh.indexNo === i) {
            final.push(highestHigh.highest);
          } else if (lowestLow.indexNo === i) {
            final.push(lowestLow.lowest);
          } else if (low.indexNo === i) {
            final.push(low.lowest);
          } else if (high.indexNo === i) {
            final.push(high.highest);
          }
        }

        const data1 = [
          {
            name: "at",
            data: final,
          },
        ];

        setData(data1);
        setBarData({
          ...bar,
          series: [
            {
              data: [
                stockDetails.avgCandelSize,
                stockDetails.allowedCandelSize,
                stockDetails.todayCandelSize,
              ],
            },
          ],
        });

        // let foo1 = new Array(max);

        // for (let i = 0; i < foo1.length; i++) {
        //   foo1[i] = i + 1;
        // }
        // setChartData({
        //   ...chart, options: {
        //     ...chart.options, xaxis: {
        //       categories: foo1,
        //     },
        //   }
        // })
      }
    };
    getData();
  }, [stockDetails]);

  const [result, setResult] = useState<any>({
    quantity: 0,
    buyCost: 0,
    slCost: 0,
    targetCost: 0,
    expectedProfit: 0,
    maximumLoss: 0,
  });
  const [formValues, setFormValues] = useState({
    buyPrice: stockDetails.currentPrice,
    stoploss: stockDetails.currentPrice,
    target: stockDetails.currentPrice,
  });

  const [freezeQty, setFreezeQty] = useState(false);
  const calculateQuantity = () => {
    let quantity = result.quantity;

    if (!freezeQty) {
      const gap = Math.abs(formValues.buyPrice - formValues.stoploss);
      const maximumLossAmount = 500;
      if (gap) {
        quantity = Math.round(maximumLossAmount / gap);
      }
    }

    const buyCost = formValues.buyPrice * quantity;
    const slCost = formValues.stoploss * quantity;
    const targetCost = formValues.target * quantity;

    let trend = "up";
    if (formValues.buyPrice > formValues.target) {
      trend = "down";
    }
    let expectedProfit = targetCost - buyCost;
    let maximumLoss = buyCost - slCost;

    if (trend === "down") {
      expectedProfit = buyCost - targetCost;
      maximumLoss = slCost - buyCost;
    }
    setResult({
      quantity,
      buyCost,
      slCost,
      targetCost,
      expectedProfit,
      maximumLoss,
    });
  };

  useEffect(() => {
    calculateQuantity();
  }, [formValues]);

  const content = (
    <CalculatedQuantityStyle>
      <Formik
        initialValues={formValues}
        validate={(values: any) => {
          const errors: any = {};
          if (!values.buyPrice) {
            errors.buyPrice = "Required";
          }
          if (!values.stoploss) {
            errors.stoploss = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setFormValues(() => values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setValues,
          /* and other goodies */
        }) => {
          const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
          };

          const onChange = (e: any) => {
            const targetEl = e.target;
            const fieldName = targetEl.name;
            setFormValues({
              ...formValues,
              [fieldName]: targetEl.value,
            });
            return handleChange(e);
          };
          return (
            <>
              <Form
                onFinish={(values: any) => {
                  // handleSubmit(e)
                }}
                {...layout}
              >
                <Form.Item label="Buy Price" name="buyPrice">
                  <Input
                    type="number"
                    name="buyPrice"
                    onChange={onChange}
                    onBlur={handleBlur}
                    value={values.buyPrice}
                    size="large"
                    placeholder="Buy Price"
                    step="0.5"
                  />
                  {errors.buyPrice && touched.buyPrice && errors.buyPrice}
                </Form.Item>

                <Form.Item label="Stoploss" name="stoploss">
                  <Input
                    type="number"
                    name="stoploss"
                    onChange={onChange}
                    onBlur={handleBlur}
                    value={values.stoploss}
                    step="0.5"
                    size="large"
                    placeholder="Stop Loss"
                  />
                  {errors.stoploss && touched.stoploss && errors.stoploss}
                </Form.Item>

                <Form.Item label="Target" name="target">
                  <Input
                    type="number"
                    name="target"
                    onChange={onChange}
                    onBlur={handleBlur}
                    value={values.target}
                    step="0.5"
                    size="large"
                    placeholder="Target"
                  />
                  {errors.target && touched.target && errors.target}
                </Form.Item>
              </Form>

              {result && (
                <Descriptions
                  title={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <span>Quantity:{result.quantity}</span>

                      <Switch
                        // style={{marginLeft:10}}
                        checked={freezeQty}
                        checkedChildren="Freezed"
                        unCheckedChildren="&nbsp;&nbsp;Unfreezed"
                        onChange={() => {
                          setFreezeQty(() => !freezeQty);
                          calculateQuantity();
                        }}
                      />

                      <Button
                        size="small"
                        onClick={() => {
                          setFormValues({
                            buyPrice: stockDetails.currentPrice,
                            stoploss: stockDetails.currentPrice,
                            target: stockDetails.currentPrice,
                          });
                          setResult({
                            quantity: 0,
                            buyCost: 0,
                            slCost: 0,
                            targetCost: 0,
                            expectedProfit: 0,
                            maximumLoss: 0,
                          });
                          setFreezeQty(false);
                          setValues({
                            buyPrice: stockDetails.currentPrice,
                            stoploss: stockDetails.currentPrice,
                            target: stockDetails.currentPrice,
                          });
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                  }
                  column={1}
                  bordered
                >
                  <Descriptions.Item label="Amount">
                    ₹{result.buyCost.toFixed(2)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Expected Profit">
                    ₹{result.expectedProfit.toFixed(2)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Maximum Loss">
                    ₹{result.maximumLoss.toFixed(2)}
                  </Descriptions.Item>
                </Descriptions>
              )}
            </>
          );
        }}
      </Formik>
      {/* <h1 className="quantity">{quantity}</h1>  */},
    </CalculatedQuantityStyle>
  );

  return (
    <StocksStyle>
      {loading && <Skeleton active />}
      {!loading && stockDetails && (
        <Card
          title={
            <>
              <span
                onClick={() => openStock(stockDetails)}
                style={{ cursor: "pointer" }}
              >
                {stockDetails.goodOne && stockDetails.valid && (
                  <LikeTwoTone style={{ color: "#5fe48a" }} />
                )}
                <span
                  style={{
                    color: stockDetails.trend === "DOWN" ? "red" : "green",
                  }}
                >
                  {" "}
                  {stockDetails.symbol}{" "}
                  <small> {stockDetails.currentPrice} </small>{" "}
                </span>{" "}
                on{" "}
                <small>
                  {moment(stockDetails.createDt).format("DD MMM YYYY h:mm a")}
                </small>{" "}
                {((stockDetails.lastCandelIsGreen &&
                  stockDetails.trend === "UP") ||
                  (!stockDetails.lastCandelIsGreen &&
                    stockDetails.trend === "DOWN")) && <SlidersTwoTone />}
              </span>
            </>
          }
          bordered={false}
        >
          <>
            <Popover
              content={content}
              title="Calculate Quantity"
              trigger="click"
            >
              <Button>Calculate Quantity</Button>
            </Popover>
          </>
          <Row>
            <Col xs={24} sm={12} md={12}>
              <h3>Candel Size</h3>
              <Chart
                options={bar.options}
                series={bar.series}
                type="bar"
                height={350}
              />
            </Col>
            <Col xs={24} sm={12} md={12}>
              {" "}
              <div style={{ textAlign: "center" }}>
                <strong>Price Action</strong>

                <Row justify="center">
                  <Col sm={12} style={{ textAlign: "center" }}>
                    <Para>
                      Highest High : {stockDetails.highestHigh.highest}
                    </Para>
                    <Para>Lowest Low : {stockDetails.lowestLow.lowest}</Para>
                  </Col>
                  <Col sm={12} style={{ textAlign: "center" }}>
                    <Para> High : {stockDetails.high.highest}</Para>
                    <Para> Low : {stockDetails.low.lowest}</Para>
                  </Col>
                </Row>

                {(stockDetails.valid && (
                  <Badge
                    count="VALID"
                    style={{ backgroundColor: "#52c41a", marginLeft: 10 }}
                  />
                )) || (
                  <Badge
                    count="INVALID"
                    style={{ backgroundColor: "#f82626", marginLeft: 10 }}
                  />
                )}
              </div>{" "}
              {chart && data && (
                <div id="chart">
                  <Chart
                    options={chart.options}
                    series={data}
                    type="line"
                    height={350}
                  />
                </div>
              )}
            </Col>
          </Row>
        </Card>
      )}
    </StocksStyle>
  );
};

export default StockContent;

export const openStock = (stock: any) => {
  window.open(
    `https://kite.zerodha.com/chart/ext/tvc/NSE/${stock.symbol}/${stock.instrument}`,
    "_blank"
  );
};
