import React from "react";
import { GetStaticProps } from "next";
import { Button, Htag, Input, P, Rating, Tag, Textarea } from "../components";
import { withLayout } from "../layout/Layout";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";
function Home({ menu }: HomeProps): JSX.Element {
  const [counter, setCounter] = React.useState<number>(0);
  const [rating, setRating] = React.useState<number>(4);
  return (
    <div>
      <Htag tag="h1">{counter}</Htag>
      <Button
        appearance="primary"
        arrow="right"
        onClick={() => setCounter((x) => x + 1)}
      >
        Кнопка
      </Button>
      <Button appearance="ghost" arrow="down">
        Кнопка
      </Button>
      <P size="l">Большой</P>
      <P size="m">Средний</P>
      <P size="s">Маленький</P>
      <Tag color="ghost" size="m">
        Привет
      </Tag>
      <Tag color="grey" size="m">
        Привет
      </Tag>
      <Tag color="primary" size="m">
        Привет
      </Tag>
      <Tag color="red" size="m">
        Привет
      </Tag>
      <Tag size="s">Привет</Tag>
      <Rating rating={4} />
      <Rating isEditable={true} rating={rating} setRating={setRating} />
      <Input placeholder="Test"></Input>
      <Textarea placeholder="Test">asd</Textarea>
    </div>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
    {
      firstCategory,
    }
  );
  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
