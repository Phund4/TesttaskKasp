import React from "react";
import { List, ConfigProvider } from "antd";
import { selectTextHandler } from "../helpers";

type dataType = { description: string }[];

interface ListProps {
    data?: dataType;
}

export const CustomList = function ({ data }: ListProps) {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorTextDescription: "rgba(0, 0, 0, 1)",
                    fontSize: 18,
                },
                components: {
                    List: {
                        contentWidth: 120,
                    },
                },
            }}
        >
            <List
                itemLayout="horizontal"
                dataSource={data}
                size="large"
                className="main-list"
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<p>{index == 0 ? "ID" : index}</p>}
                            description={
                                <p id={`str-in-list-${index}`}>
                                    {index == 0
                                        ? "Text"
                                        : item?.description[0]
                                              ?.split(" ")
                                              .map((el, ind) => {
                                                  return (
                                                      <>
                                                          <span
                                                              id={`word-in-str-${index}-${ind}`}
                                                              key={`word-in-str-${index}-${ind}`}
                                                              onClick={
                                                                  selectTextHandler
                                                              }
                                                          >
                                                              {el}
                                                          </span>
                                                          <span
                                                              key={`space-in-str-${index}-${ind}`}
                                                          >
                                                              {" "}
                                                          </span>
                                                      </>
                                                  );
                                              })}
                                </p>
                            }
                        />
                    </List.Item>
                )}
            />
        </ConfigProvider>
    );
};
