"use client";
import React, { ReactNode, useEffect } from "react";
import { AlbumProvider, useGlobal } from "../AlbumProvider";
import Albums from "../../assets/Albums.json";
import { Album } from "../../Album";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import classNames from "classnames";
import Player, { MusicTrack } from "./Player";
import GameToggler from "./GameToggler";
import SongPreview from "./SongPreview";
import AppProvider, { useApp } from "../AppProvider";
import Game from "./Game";
import Avatar from "/Avatar.jpg";
 
interface AlbumLayoutProps {
  params: {
    AlbumName: string;
  };
  children: ReactNode;
}

export function AlbumView({ children }: { children: ReactNode }) {
  const { currentSongIndex, album, setCurrentSong } = useGlobal();
  const { Artist } = album || {};
  const { load  } = useGlobalAudioPlayer();
  const CurrentSong = album.Songs[currentSongIndex];
  const [gameOpened] = useApp().game;

  useEffect(() => {
    if (CurrentSong) {
      load(CurrentSong.Url, {
        autoplay: true,
        onend: () =>
          setCurrentSong((prev) =>
            prev === album.Songs.length - 1 ? 0 : prev + 1
          ),
        html5: true,
      });
    }
  }, [currentSongIndex, load]);

  if (!album) {
    return null; // Render nothing if album is undefined
  }
  return (
    <>
     
      <main
        className={classNames(
          " transition-all duration-1000 ease-in-out  text-gray-500 items-center overflow-visible "
        )}
      >
        <div className=" w-full overflow-x-hidden   bg-gradient-to-t from-zinc-900 to-slate-800 portrait:pt-20">
          {!gameOpened && children} <Game />
          <div className="text-start px-6 landscape:px-14 bg-gradient-to-r from-green-100  to-green-500 bg-clip-text text-transparent  ">
            <div className="landscape:hidden"> 
              <h1 className="text-xl pt-4 w-full   flex justify-between font-semibold tracking-wide">
                <span>{album.Name}</span>
                <span className=" relative ">
                  <GameToggler className=" text-green-300" />
                </span>
              </h1>
              <span className="text-sm  flex items-end gap-3  font-semibold">
                {" "}
                <img
                  src={Avatar}
                  className=" rounded-full aspect-square h-5"
                />{" "}
                {Artist} (2024)
              </span>
            </div>
            <div className={ classNames(" flex portrait:flex-col landscape:flex-col-reverse   portrait:py-3 landscape:pb-3",)}>
              <Player />
              <MusicTrack />
            </div>
          </div>
        </div>
        <div className=" bg-zinc-900">
          {Array.from(album.Songs.keys()).map((i) => (
            <SongPreview
              className="px-6 landscape:px-14 z-20 backdrop-hue-rotate-180"
              key={i}
              songId={i}
            />
          ))}
        </div>
      </main>
      <footer className=" "></footer>
    </>
  );
}

const AlbumLayout: React.FC<AlbumLayoutProps> = ({ params, children }) => {
  const currentAlbum = Albums.find((album) => album.Url === params.AlbumName);

  if (!currentAlbum) {
    throw new Error("Album not found");
  }

  const formattedAlbum: Album = {
    ...currentAlbum,
    Songs: currentAlbum.Songs.map((song) => ({ Url: song })),
  };

  return (
    <AlbumProvider album={formattedAlbum}>
      <AppProvider>
        <AlbumView>{children}</AlbumView>
      </AppProvider>
    </AlbumProvider>
  );
};

export default AlbumLayout;
