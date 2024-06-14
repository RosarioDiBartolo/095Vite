
"use client";
import React, { ReactNode,   useEffect } from 'react';
import { AlbumProvider, useGlobal } from '../AlbumProvider';
import Albums from "../../assets/Albums.json" 
import { Album } from '../../Album';
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import classNames from 'classnames';
import Player, { MusicTrack } from './Player';
import GameToggler from './GameToggler';
import SongPreview from './SongPreview';
import AppProvider, { useApp } from '../AppProvider';
import Game from './Game';
import Header from './Header';

interface AlbumLayoutProps {
  params: {
    AlbumName: string;
  };
  children: ReactNode;
}

export function AlbumView({ children }: { children: ReactNode }) {
   const { currentSongIndex, album ,setCurrentSong } = useGlobal();
  const { Artist } = album || {};
  const { load } = useGlobalAudioPlayer();
  const CurrentSong = album.Songs[currentSongIndex];
  const [ gameOpened] = useApp().game
 
  useEffect(() => {
    if (CurrentSong) {
       load(CurrentSong.Url, {
         autoplay: true,
         onend: () =>
           setCurrentSong(prev =>
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
      <Header>
       </Header>
       <main className={classNames('   transition-all duration-1000 ease-in-out  text-gray-500 flex flex-col items-center md:items-start h-svh')}>
          <div className="w-full flex-none h-svh ">
            <div className=' bg-gradient-to-t from-zinc-800 via-zinc-950/80'> 
             { !gameOpened && children}         <Game />

            </div>
            <div className='   bg-gradient-to-b portrait:from-zinc-800 landscape:from-zinc-900 landscape:via-zinc-900   z-10     flex-1      '>
              <div className="text-start px-6 landscape:hidden h-full bg-gradient-to-r from-green-500  to-zinc-100 bg-clip-text text-transparent  ">
                <h1 className="text-lg pt-4 flex justify-between font-semibold tracking-wide">
                  <span>{album.Name}</span>
                  <span className=' relative right-4'>
                    <GameToggler />
                  </span>
                </h1>
                <span className="text-sm font-extralight">{Artist} (2024)</span>
                </div>

                <div className="px-6  backdrop-blur-md landscape:px-14    z-40 backdrop-hue-rotate-180  flex portrait:flex-col landscape:flex-col-reverse   portrait:py-3 landscape:pb-3">
                  <Player />
                  <MusicTrack />
                </div>
                 
          </div>
          <div> 
          {Array.from (album.Songs.keys()).map( i => (
                <SongPreview className="px-6 landscape:px-14 z-20" key={i} songId={i} />
              ))} 
              </div>
        </div>
 
      </main>

      <footer className={classNames('text-white p-3 flex flex-col mt-5 fixed bottom-2 w-full')}></footer>
    </>
  );
}

const AlbumLayout: React.FC<AlbumLayoutProps> = ({ params, children }) => {
  const currentAlbum = Albums.find(album => album.Url === params.AlbumName);

  if (!currentAlbum) {
    throw new Error('Album not found');
  }

  const formattedAlbum: Album = {
    ...currentAlbum,
    Songs: currentAlbum.Songs.map(song => ({ Url: song })),
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