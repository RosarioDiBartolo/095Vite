
export interface Song{
     Name?: string;
     Url:  string;
   }

 export interface AlbumMeta{
    Name: string;
    Logo: string;
    Artist: string;
    Url: string;
  }

  export type Album  = AlbumMeta & { Songs: Song[]}
 