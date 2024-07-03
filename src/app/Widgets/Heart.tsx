"use client";
import  { useState } from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import classNames from 'classnames';

function Heart() {
  const [Liked, setLiked] = useState(false);
  const Icon = Liked ? GoHeartFill : GoHeart;
  return <Icon style={{ animationIterationCount: "initial" }} onClick={() => setLiked(!Liked)} size={28} className={classNames(" relative bottom-2", { " ": !Liked, "animate-ping text-green-500    ": Liked })} />;
}

export default Heart