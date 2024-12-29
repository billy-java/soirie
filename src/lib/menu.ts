import { iconsListe } from './iconsListe';
import { IMenu } from './interfaces/IMenu';

export const menu: IMenu[] = [
  {
    actif: true,
    afficher: true,
    nom: 'Home',
    lien: '/home',
    icon1: iconsListe.home,
  },
  {
    actif: true,
    afficher: true,
    nom: 'Dashboard',
    lien: '/dashboard',
    icon1: iconsListe.dashboard,
  },
  {
    actif: true,
    afficher: true,
    nom: 'Taches',
    lien: '/taches',
    icon1: iconsListe.tache,
  },
  {
    actif: true,
    afficher: true,
    nom: 'Depenses',
    lien: '/depenses',
    icon1: iconsListe.cotisation, //modifier le nom de licone
  },
  {
    actif: true,
    afficher: true,
    nom: 'Prestataires',
    lien: '/prestataires',
    icon1: iconsListe.user2,
  },
  {
    actif: true,
    afficher: true,
    nom: 'Menu',
    lien: '/menu',
    icon1: iconsListe.menu,
  },
];

export const menuParametre: IMenu[] = [
  {
    actif: true,
    afficher: true,
    nom: 'Home',
    lien: '/home',
    icon1: iconsListe.home,
  },
  {
    actif: true,
    afficher: true,
    nom: 'Paramètres',
    lien: '/parametres',
    icon1: iconsListe.parametre1,
  },
  {
    actif: true,
    afficher: true,
    nom: 'Contact',
    lien: '/contact',
    icon1: iconsListe.contact,
  },
  {
    actif: true,
    afficher: true,
    nom: 'Aide',
    lien: '/aide',
    icon1: iconsListe.faq,
  },
];
