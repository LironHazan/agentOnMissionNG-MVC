'use strict';

angular.module('agentMission')
    .constant('Consts', {
        MISSIONS_INPUT: [
            {
                agent: '007',
                parent: '005',
                country: 'Brazil',
                address: 'Avenida Vieira Souto 168 Ipanema, Rio de Janeiro',
                date: 'Dec 17, 1995, 9:45:17 PM'
            },
            {
                agent: '005',
                parent: null,
                country: 'Poland',
                address: 'Rynek Glowny 12, Krakow',
                date: 'Apr 5, 2011, 5:05:12 PM'
            },
            {
                agent: '007',
                parent: '005',
                country: 'Morocco',
                address: '27 Derb Lferrane, Marrakech',
                date: 'Jan 1, 2001, 12:00:00 AM'
            },
            {
                agent: '005',
                parent: null,
                country: 'Brazil',
                address: 'Rua Roberto Simonsen 122, Sao Paulo',
                date: 'May 5, 1986, 8:40:23 AM'
            },
            {
                agent: '011',
                parent: '007',
                country: 'Poland',
                address: 'swietego Tomasza 35, Krakow',
                date: 'Sep 7, 1997, 7:12:53 PM'
            },
            {
                agent: '003',
                parent: '005',
                country: 'Morocco',
                address: 'Rue Al-Aidi Ali Al-Maaroufi, Casablanca',
                date: 'Aug 29, 2012, 10:17:05 AM'
            },
            {
                agent: '008',
                parent: '003',
                country: 'Brazil',
                address: 'Rua tamoana 418, tefe',
                date: 'Nov 10, 2005, 1:25:13 PM'
            },
            {
                agent: '013',
                parent: '008',
                country: 'Poland',
                address: 'Zlota 9, Lublin',
                date: 'Oct 17, 2002, 10:52:19 AM'
            },
            {
                agent: '002',
                parent: '008',
                country: 'Morocco',
                address: 'Riad Sultan 19, Tangier',
                date: 'Jan 1, 2017, 5:00:00 PM'
            },
            {
                agent: '009',
                parent: null,
                country: 'Morocco',
                address: 'atlas marina beach, agadir',
                date: 'Dec 1, 2016, 9:21:21 PM'
            }
        ],
        HOME_BASE: '10 Downing st. London'
    });