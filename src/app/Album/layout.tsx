"use client";
import React, { ReactNode, useEffect  } from "react";
import { AlbumProvider, useGlobal } from "../AlbumProvider";
import Albums from "../../assets/Albums.json";
import { Album } from "../../Album";
import classNames from "classnames";
import Player, { MusicTrack } from "../AppComponents/Player";
import GameToggler from "../Widgets/GameToggler";
import SongPreview from "../AppComponents/SongPreview";
import AppProvider, { useApp } from "../AppProvider";
import Game from "../AppComponents/Game";
import Avatar from "/Avatar.jpg";
import { useGlobalAudioPlayer } from "react-use-audio-player";

interface AlbumLayoutProps {
  params: {
    AlbumName: string;
  };
  children: ReactNode;
}

export function AlbumView({ children }: { children: ReactNode }) {
  const { currentSongIndex, album, setCurrentSong } = useGlobal();
  const { Artist, Songs = [] } = album || {}; // Destructure Songs with default value

  const CurrentSong = Songs[currentSongIndex];
  const [gameOpened] = useApp().game;
  const { load  } = useGlobalAudioPlayer(); // Destructure 'playing' for optional UI logic

  useEffect(() => {
    if (CurrentSong) {
      load(CurrentSong.Url, {
        autoplay: true,
        onend: () =>
          setCurrentSong((prev) =>
            prev === Songs.length - 1 ? 0 : prev + 1
          ),
        html5: true,
      });
    }
  }, [CurrentSong, load, setCurrentSong, Songs]);

  if (!album) {
    return null; // Render nothing if album is undefined
  }

  return (
    <>
      <main
        className={classNames(
          "transition-all duration-1000 ease-in-out text-gray-500 items-center overflow-visible bg-gradient-to-b from-slate-800 via-transparent"
        )}
      >
        <div className="w-full overflow-x-hidden portrait:pt-20">
          {!gameOpened && children} <Game />
          <div
            className={classNames(
              "text-start px-6 landscape:px-14 bg-gradient-to-r from-green-500 to-green-100 bg-clip-text text-transparent"
            )}
          >
            <div className="landscape:hidden">
              <h1 className="text-xl pt-4 w-full flex justify-between font-semibold tracking-wide">
                <span>{album.Name}</span>
                <span className="relative">
                  <GameToggler className="text-green-300" />
                </span>
              </h1>
              <span className="text-sm flex items-end gap-3 font-semibold">
                {" "}
                <img
                  src={Avatar}
                  className="rounded-full aspect-square h-5"
                  alt="Artist Avatar"
                />{" "}
                {Artist} (2024)
              </span>
            </div>
            <div
              className={classNames(
                "flex portrait:flex-col landscape:flex-col-reverse portrait:py-3 landscape:pb-3"
              )}
            >
              <Player />
              <MusicTrack />
            </div>
          </div>
        </div>

        <div>
          {Songs.map((_, i) => (
            <SongPreview
              className="landscape:px-14 z-20 backdrop-hue-rotate-180"
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
