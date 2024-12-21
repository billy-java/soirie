import { iconsListe } from './iconsListe';
import { IMenu } from './interfaces/IMenu';

export const menu: IMenu[] = [
  {
    actif: true,
    afficher: true,
    nom: 'Accueil',
    lien: '/',
    icon1: iconsListe.home,
  },
  {
    actif: true,
    afficher: true,
    nom: 'Dashboard',
    lien: '/',
    icon1: iconsListe.dashboard,
  },
  {
    actif: true,
    afficher: true,
    nom: 'Evenements',
    lien: '/evenements',
    icon1: iconsListe.evenement,
  },
  {
    actif: true,
    afficher: true,
    nom: 'Taches',
    lien: '/taches',
    icon1: iconsListe.activite1,
  },
  {
    actif: true,
    afficher: true,
    nom: 'Invitations',
    lien: '/invitations',
    icon1: iconsListe.pret,
    icon2: iconsListe.vote,
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
    icon1: iconsListe.user1,
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
    nom: 'Faq',
    lien: '/faq',
    icon1: iconsListe.faq,
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
    icon1: iconsListe.aide,
  },
];
