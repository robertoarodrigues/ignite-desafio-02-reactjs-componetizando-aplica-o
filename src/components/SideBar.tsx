import { useEffect, useState } from 'react';
import { Button } from './Button';
import { GenreResponseProps } from './types';
import { api } from '../services/api';

interface SideBarProps{
  handleClickButton:(id: number) => void;
  selectedGenreId: number;
}

export function SideBar( {handleClickButton, selectedGenreId}: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleSelectId(id: number) {
    handleClickButton(id);
  }

  return (
    <nav className="sidebar">
    <span>Watch<p>Me</p></span>
  
    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          id={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => handleSelectId(genre.id)}
          selected={selectedGenreId === genre.id}
        />
      ))}
    </div>
  
  </nav>
  )
}