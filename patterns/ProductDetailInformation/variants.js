const default_props = {
  ean: '4260040558015',
  datatype: 'makaira-productgroup',
  price: 289,
  picture_url_main: '/assets/images/productDetailInformation/example.jpg',
  id: '106060',
  title: 'SONY KD-55XG8577 LED TV (4K UHD)',
  attributeStr: [
    {
      id: 'attribute-color',
      title: 'Farbe',
      value: 'Blau',
    },
    {
      id: 'attribute-color',
      title: 'Farbe',
      value: 'Grün',
    },
    {
      id: 'attribute-color',
      title: 'Farbe',
      value: 'Rot',
    },
    {
      id: 'attribute-size',
      title: 'Größe',
      value: 'S',
    },
    {
      id: 'attribute-size',
      title: 'Größe',
      value: 'M',
    },
    {
      id: 'attribute-size',
      title: 'Größe',
      value: 'L',
    },
  ],
  url: '/leitz-eins-zwei-dry-rotwein-106060.html',
  longdesc:
    'Als gebietstypischer Vertreter der Pfalz ist von dem Spätburgunder EINS-ZWEI-DRY des Weinguts Leitz viel zu erwarten. Ein Versprechen, das dieser Wein halten kann. Dank der intensiven Mazeration und Maischegärung präsentiert er sich purpurrot im Glas. Dezente Aromen von Erde, Leder und Tabak steigen in die Nase. Er duftet nach reifen Früchten wie Kirschen und Beeren. Im Mund intensivieren sich die Aromen zum Geschmack nach Sauerkirschen und Waldbeeren.\nDurch die Lagerung im Barrique erhält der Wein eine sanfte Holznote, welche wunderbar mit den Fruchtaromen des Weines harmoniert. Eine gut ausgeprägte Säurestruktur steht dem gut ausgebildeten Tannin-Gerüst entgegen und verleiht dem Wein Körper sowie Lagerfähigkeit. Dieser Wein eignet sich perfekt, um ein schönes Abendessen zu vervollständigen, insbesondere als Begleitung zu geschmortem Hirschragout mit karamellisierten Birnen und Röstkartoffeln.\nDas Weingut Josef Leitz, welches hinter diesem Wein steckt ist international anerkannt und renommiert. Es blickt schon auf eine lange Tradition zurück, versteht sich aber ebenso darauf, mit der Zeit zu gehen und sich weiterzuentwickeln.',

  // added props
  picture_url_small:
    '/assets/images/productDetailInformation/example_small.jpg',
  magnifier_type: 'tap',
}

export default [
  {
    name: 'Default',
    props: { ...default_props },
  },

  {
    name: 'Glass Magnifier',
    props: { ...default_props, magnifier_type: 'glass' },
  },

  {
    name: 'Side by Side Magnifier',
    props: { ...default_props, magnifier_type: 'side_by_side' },
  },
]
