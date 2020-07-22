const spots = [
  {
    product: [
      {
        ean: '8437011284105',
        manufacturer_title: null,
        datatype: 'makaira-productgroup',
        price: 39.95,
        manufacturerid: null,
        picture_url_main:
          'https://www.ludwig-von-kapff.de/media/catalog/product/1/4/141433-mombasa-club-colonels-reserve-170x340.png',
        id: '141433',
        title:
          "Mombasa Club Gin Colonel's Reserve London Dry Gin - 43,5% vol - in Geschenkverpackung",
        url: '/mombasa-club-colonel-s-reserve-london-dry-gin.html',
        longdesc:
          'Der Mombasa Club Colonel\u2019s Reserve jetzt in hochwertiger Geschenkverpackung! Diese limitierte Sonderedition wird Sie mit einem reichen Aromenspektrum, das die ganze Bandbreite der exotischen Ingredenzien widerspiegelt, verf\u00fchren. Dieses verleiht diesem traumhaften Gin ein intensives und \u00fcppiges Bukett und pr\u00e4sentieren sich mit zart-s\u00fc\u00dflichen Nuancen und feinen Zitrus- und Anisnoten auf der Zunge.\nDie hocherfahrenen englischen Brennmeister verwenden nur hochwertigste Zutaten wie Kriechwacholder, Koriander, K\u00fcmmel oder Nelken und destillieren ihn besonders hutsam mit der "Small Batch" Destillation.\u00a0Gut ausbalanciert und ausgesprochen mild. Eine Offenbarung f\u00fcr Gin-Liebhaber und ein Genuss f\u00fcr alle, die das Besondere lieben.',
      },
    ],
    left: 73,
    top: 50,
  },
  {
    product: [
      {
        ean: '4400066900232',
        manufacturer_title: null,
        datatype: 'makaira-productgroup',
        price: 5.95,
        manufacturerid: null,
        picture_url_main:
          'https://www.ludwig-von-kapff.de/media/catalog/product/3/0/300230-rotkaeppchen-sekt-flg-chard-extra-tr.png',
        id: '300230',
        title:
          'Rotk\u00e4ppchen Sekt Flascheng\u00e4rung Chardonnay Extra Trocken',
        url: '/rotkaeppchen-sekt-flaschengaerung-chardonnay-300230.html',
        longdesc:
          'Samtig und vollmundig im Geschmack pr\u00e4sentiert sich der rebsortenreine Chardonnay Sekt nach der traditionellen Flascheng\u00e4rung und einer Reifezeit von \u00fcber neun Monaten.\nGoldgelb in der Farbe \u00fcberzeugt er mit einem zart-fruchtigen Charakter schon nach dem ersten Schluck. Die Nase wird von elegant-ausbalancierten, buttrig-nussigen Noten und einem feinen Duft von Honigmelone bet\u00f6rt. Die gut eingebundene und harmonische S\u00e4ure unterst\u00fctzt die spritzige, feine Perlage, die f\u00fcr ein charaktervolles Geschmackserlebnis sorgt.',
      },
    ],
    left: 44,
    top: 43,
  },
  {
    product: [
      {
        ean: '4400066903530',
        manufacturer_title: null,
        datatype: 'makaira-productgroup',
        price: 4.5,
        manufacturerid: null,
        picture_url_main:
          'https://www.ludwig-von-kapff.de/media/catalog/product/3/0/303530-rotkaeppchen-sekt-halbtr.png',
        id: '303530',
        title: 'Rotk\u00e4ppchen Sekt Tradition Halbtrocken',
        url: '/rotkaeppchen-sekt-tradition-303530.html',
        longdesc:
          'Die ausgewogene Grundwein-Cuv\u00e9e verleiht diesem Rotk\u00e4ppchen Tradition Sekt Halbtrocken eine fruchtig-spritzige und zugleich temperamentvolle Note. Hellgelb, mit einem vollfruchtigen Bukett pr\u00e4sentiert sich der halbtrockene Sekt im Glas.\nAm Gaumen angenehm mit einer lieblich-fruchtigen Note. Eine temperamentvolle und lebendige Perlage begeistert und verleiht dem Sekt ein spritziges Finale.',
      },
    ],
    left: 23,
    top: 60,
  },
]

const image = 'assets/images/discoveryImage/example_image.jpg'

export default [
  {
    name: 'Discovery Image',
    props: {
      discoveryImage: {
        image,
        spots,
      },
    },
  },
]
