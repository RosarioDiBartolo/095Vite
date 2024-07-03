"use client";

import React, { createContext, useContext, useState, ReactNode  } from 'react';
import { Album } from '../Album'; 
interface ColorProperty {
  [property: string]: number; // Here you define the keys and their value types
}
// Define the context type
interface AlbumContextType {
  setThemeColor: React.Dispatch<React.SetStateAction<string>>;
  getColor: ( props:  ColorProperty  ) => string[];
  currentSongIndex: number;
  setCurrentSong: React.Dispatch<React.SetStateAction<number>>;
  album: Album; 
}

// Create the context with a default value
const defaultAlbumContext: AlbumContextType = {
  setThemeColor: ()=> 0,
  getColor: ( )=> [],
  currentSongIndex: 0,
  setCurrentSong: () => 0,
  album: {
    Url: '',
    Name: '',
    Artist: '',
    Songs: [],
    Logo: '',
  } 
};

export const AlbumContext = createContext<AlbumContextType>(defaultAlbumContext);

// Define the provider props type
interface AlbumProviderProps {
  children: ReactNode;
  album: Album;
}

// Create the provider component
export const AlbumProvider: React.FC<AlbumProviderProps> = ({ children, album }) => {

  const [currentSongIndex, setCurrentSong] = useState<number>(0);
  const [ThemeColor, setThemeColor] = useState("green");

   // Function to generate dynamic class names
   function getColor( props: ColorProperty) {
     return   Object.entries(props).map(

      ([property, variant] ) => `${property}-${ThemeColor}-${variant}`
     )
  }


  const value = {
    setThemeColor,
    getColor,
    currentSongIndex,
    setCurrentSong, 
    album: {
      ...album,
      Songs: album.Songs.map(song => ({
        Url: `/Albums/${album.Name}/${song.Url}`,
        Name: song.Name || song.Url.replace('.wav', ''),
      })),
      Logo: `/Albums/${album.Name}/${album.Logo}`,
    },
  };

  return <AlbumContext.Provider value={value}>{children}</AlbumContext.Provider>;
};

// Hook to use the Album context
export const useGlobal = () => useContext(AlbumContext);

// Hook to get the current song
export const useSong = () => {
  const { currentSongIndex, album } = useGlobal();
  return album?.Songs[currentSongIndex];
};