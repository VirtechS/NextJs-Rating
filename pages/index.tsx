import React from 'react';
import { Button, Htag, P, Rating, Tag } from '../components';

export default function Home(): JSX.Element {
  const [counter, setCounter] = React.useState<number>(0);
  const [rating, setRating] = React.useState<number>(4);
  return (
    <div>
      <Htag tag='h1'>{counter}</Htag>
      <Button appearance='primary' arrow='right' onClick={() => setCounter(x => x+1)}>Кнопка</Button>
			<Button appearance='ghost' arrow='down'>Кнопка</Button>
      <P size="l">Большой</P>
      <P size="m">Средний</P>
      <P size="s">Маленький</P>
      <Tag color="ghost" size="m">Привет</Tag>
      <Tag color="grey" size="m">Привет</Tag>
      <Tag color="primary" size="m">Привет</Tag>
      <Tag color="red" size="m">Привет</Tag>
      <Tag size="s">Привет</Tag>
      <Rating rating={4}/>
      <Rating isEditable={true} rating={rating} setRating={setRating}/>
    </div>
  )
}
