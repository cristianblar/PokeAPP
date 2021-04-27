/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import swal from 'sweetalert';

import LoadingScreen from '../Loading/Loading';

import { API_URL } from '../../constants';

import {
  handleError,
  toggleLoading,
  getPaginatedPokemons,
  changeAllPokemons,
  changeCurrentPokemons,
  getPokemonsByIdAsc,
  getPokemonsByNameAsc,
  getPokemonsByNameDesc,
  getPokemonsByAttackAsc,
  getPokemonsByAttackDesc,
  getPokemonsByExperienceAsc,
  getPokemonsByExperienceDesc,
} from '../../store/actions/index';

import Layout from '../Layout/Layout';
import SearchBar from './SearchBar/SearchBar';
import SortButton from './SortButton/SortButton';
import TypeFilter from './TypeFilter/TypeFilter';
import PokemonCards from '../PokemonCards/PokemonCards';
import Pagination from './Pagination/Pagination';

function AllPokemons({
  startLoading,
  cleanError,
  loading,
  error,
  allPokemons,
  currentPokemons,
  pages,
  currentPage,
  getInitialPokemons,
  updatePokemonsList,
  updatePokemons,
  getPokemonsAscendingId,
  getPokemonsAscendingName,
  getPokemonsDescendingName,
  getPokemonsAscendingAttack,
  getPokemonsDescendingAttack,
  getPokemonsAscendingExperience,
  getPokemonsDescendingExperience,
}) {
  const history = useHistory();

  const [sortOption, setSortOption] = useState('id');
  const [filters, setFilters] = useState({
    pokemonType: 'all',
    origin: 'all',
  });

  const handleSort = (event) => {
    setSortOption(event.target.value);
  };

  const handleFilter = (event) => {
    if (event.target.id.startsWith('type'))
      setFilters((currentState) => ({
        ...currentState,
        [event.target.name]: event.target.id.substring(5),
      }));
    else
      setFilters((currentState) => ({
        ...currentState,
        [event.target.name]: event.target.id.substring(7),
      }));
  };

  const onSearch = (name) => {
    if (!name) swal({ title: 'Name or ID required', icon: 'warning' });
    else history.push(`/pokemons/${name}`);
  };

  const deleteAll = () => {
    const deleteBody = { all: true };
    const deleteOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deleteBody),
    };
    swal({
      title: 'Are you sure?',
      text: 'This action will delete all your created Pokémon forever 😢',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((response) => {
      if (response) {
        startLoading();
        fetch(`${API_URL}/pokemons`, deleteOptions)
          .then(() => {
            updatePokemonsList(filters);
            swal({
              title: 'Done!',
              text: 'All created Pokémon were deleted',
              icon: 'success',
            });
          })
          .catch(
            swal({
              title: 'Something went wrong...',
              text: 'Please, try again later',
              icon: 'info',
            })
          );
      }
    });
  };

  // Primera carga cuando se crea el componente (12 pokemons), no volverá a correr:
  useEffect(() => {
    cleanError('remove');
    getInitialPokemons();
  }, []);

  // Change page function for Frontend pagination:
  const changePageWithFrontPagination = (pageNumber) =>
    updatePokemons(pageNumber);

  // Actualización de pokemones cuando se cambia el filtro:
  useEffect(() => {
    updatePokemonsList(filters);
    setSortOption('id');
  }, [filters]);

  // Actualización de pokemones cuando se agrega sort:
  useEffect(() => {
    if (allPokemons)
      switch (sortOption) {
        case 'id':
          getPokemonsAscendingId();
          break;
        case 'name_asc':
          getPokemonsAscendingName();
          break;
        case 'name_desc':
          getPokemonsDescendingName();
          break;
        case 'attack_asc':
          getPokemonsAscendingAttack(allPokemons);
          break;
        case 'attack_desc':
          getPokemonsDescendingAttack(allPokemons);
          break;
        case 'experience_asc':
          getPokemonsAscendingExperience(allPokemons);
          break;
        case 'experience_desc':
          getPokemonsDescendingExperience(allPokemons);
          break;
        default:
          break;
      }
  }, [sortOption]);

  if (error)
    return (
      <Layout>
        <h4>Something happened... Try again, please!</h4>
      </Layout>
    );

  if (!loading && !currentPokemons.length)
    return (
      <Layout>
        <SearchBar onSearch={onSearch} />
        <TypeFilter currentFilters={filters} handleFilter={handleFilter} />
        <img
          src="https://res.cloudinary.com/cristianblar/image/upload/v1619440623/sadPikachu_noDetail_vtsf0k.png"
          alt="Sad pikachu"
          width="195"
          height="176"
        />
        <h4>No Pokémon found with the applied filter 😢</h4>
      </Layout>
    );

  return (
    <Layout>
      <SearchBar onSearch={onSearch} />
      <TypeFilter currentFilters={filters} handleFilter={handleFilter} />
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <SortButton sortOption={sortOption} handleSort={handleSort} />
          <PokemonCards currentPokemons={currentPokemons} />
          <Pagination
            pages={pages}
            currentPage={currentPage}
            changePage={changePageWithFrontPagination}
          />
          {filters.origin === 'created' ? (
            <button type="button" onClick={deleteAll}>
              Delete all created Pokémon
            </button>
          ) : (
            ''
          )}
        </>
      )}
    </Layout>
  );
}

AllPokemons.propTypes = {
  startLoading: PropTypes.func.isRequired,
  cleanError: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  allPokemons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      image_url: PropTypes.string,
      name: PropTypes.string,
      types: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  currentPokemons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      image_url: PropTypes.string,
      name: PropTypes.string,
      types: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  pages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  getInitialPokemons: PropTypes.func.isRequired,
  updatePokemonsList: PropTypes.func.isRequired,
  updatePokemons: PropTypes.func.isRequired,
  getPokemonsAscendingId: PropTypes.func.isRequired,
  getPokemonsAscendingName: PropTypes.func.isRequired,
  getPokemonsDescendingName: PropTypes.func.isRequired,
  getPokemonsAscendingAttack: PropTypes.func.isRequired,
  getPokemonsDescendingAttack: PropTypes.func.isRequired,
  getPokemonsAscendingExperience: PropTypes.func.isRequired,
  getPokemonsDescendingExperience: PropTypes.func.isRequired,
};

// Conexión a la Redux Store:

function mapStateToProps(state) {
  return {
    loading: state.loading,
    error: state.error.status,
    allPokemons: state.allPokemons,
    currentPokemons: state.currentPokemons,
    pages: state.pages,
    currentPage: state.currentPage,
  };
}

const mapDispatchToProps = {
  startLoading: toggleLoading,
  cleanError: handleError,
  getInitialPokemons: getPaginatedPokemons,
  updatePokemonsList: changeAllPokemons,
  updatePokemons: changeCurrentPokemons,
  getPokemonsAscendingId: getPokemonsByIdAsc,
  getPokemonsAscendingName: getPokemonsByNameAsc,
  getPokemonsDescendingName: getPokemonsByNameDesc,
  getPokemonsAscendingAttack: getPokemonsByAttackAsc,
  getPokemonsDescendingAttack: getPokemonsByAttackDesc,
  getPokemonsAscendingExperience: getPokemonsByExperienceAsc,
  getPokemonsDescendingExperience: getPokemonsByExperienceDesc,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllPokemons);
