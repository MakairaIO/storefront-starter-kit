import { shouldSkipQuestion } from './shouldSkipQuestion'
import variants from './variants'

const questions = variants[0].props.questions

// TODO: write unit tests that actually make sense

describe('questions that are not needed are skipped', () => {
  it('returns false if no answers are passed in', () => {
    const shouldSkip = shouldSkipQuestion(items, questions, [])
    expect(shouldSkip).toEqual(false)
  })

  it("returns false if an answer is still needed for the questions that don't have a default (or no) answer", () => {
    const shouldSkip = shouldSkipQuestion(items, questions, [
      {
        field: 'price',
        operator: 'gte',
        value: 10,
      },
    ])

    expect(shouldSkip).toEqual(false)
  })

  // it("doesn't return an empty a")
})

const items = [
  {
    id: 'd866060a82d29bc94db20bdfd0e73713',
    fields: {
      id: 'd866060a82d29bc94db20bdfd0e73713',
      ean: '2502',
      url: 'Wakeboarding/Sets/Set-O-BRIEN-VICE-2010.html',
      price: 599,
      title: "Set O'BRIEN VICE 2010",
      active: true,
      ispseudo: false,
      longdesc:
        "O'Brien Vice & Vice CT Boot 2010\r\nBoard:\r\n&nbsp;\r\nDas Vice von Josh Sanders wird gerne als der Wellenbrecher der\r\nO'Brien Serie bezeichnet, denn es hat die Breite und den progressiven\r\nRocker für riesige Höhen und eine lange center spine für butterweiche\r\nLandungen.\r\n&nbsp;\r\nDie Crook Finnen, welche dem Board keinen Speed nehmen, geben ihm\r\nStabilität und absolute Kantenkontrolle, egal wie aggressiv Sie es\r\nkanten.\r\n&nbsp;\r\nDie DELTA Base macht es noch schneller, so können Sie längere Runs fahren und höher fliegen.\r\n&nbsp;\r\nBindung:\r\n&nbsp;\r\nDie Vice Pro Bindung sind nicht nur Close-Toe Boots mit hammer\r\nStyle, sondern es war das Ziel den Komfort von normalen Boots in eine\r\nWakeboard-Bindung einzubringen, dabei leichtgewichtig zu bleiben, und\r\ndamit perfekte Performance auf dem Wasser zu ermöglichen.\r\n\r\n    Die Wakeboard-Bindung ist in der Größe gleich bleibend, gibt also im\r\n Laufe der Zeit nicht nach und sitzt somit wie ein perfekter Schuh. Ein\r\nergonomisches und stoßabsorbierendes Fußbett sorgt für weiche\r\nLandungen.&nbsp;",
      selflinks: {
        de: 'Wakeboarding/Sets/Set-O-BRIEN-VICE-2010.html',
        eg: 'eg/oxid-oxid/oxid/2502.html',
        en: 'en/Wakeboarding/Sets/Set-O-BRIEN-VICE-2010.html',
      },
      manufacturerid: '',
      picture_url_main:
        'https://stage.makaira.io/oxid6/out/pictures/master/product/1/obrien_vice__vice_ct_boot_2010_1.jpg',
      manufacturer_title: null,
      datatype: 'makaira-productgroup',
      images: [
        'https://stage.makaira.io/oxid6/out/pictures/master/product/1/obrien_vice__vice_ct_boot_2010_1.jpg',
      ],
      'makaira-product': {
        id: '2bed7b6b3d1c6108ae4d89570737e173',
        ean: '2502',
        url: 'Wakeboarding/Sets/Set-O-BRIEN-VICE-2010.html',
        price: 599,
        title: "Set O'BRIEN VICE 2010",
        active: true,
        ispseudo: true,
        longdesc:
          "O'Brien Vice & Vice CT Boot 2010\r\nBoard:\r\n&nbsp;\r\nDas Vice von Josh Sanders wird gerne als der Wellenbrecher der\r\nO'Brien Serie bezeichnet, denn es hat die Breite und den progressiven\r\nRocker für riesige Höhen und eine lange center spine für butterweiche\r\nLandungen.\r\n&nbsp;\r\nDie Crook Finnen, welche dem Board keinen Speed nehmen, geben ihm\r\nStabilität und absolute Kantenkontrolle, egal wie aggressiv Sie es\r\nkanten.\r\n&nbsp;\r\nDie DELTA Base macht es noch schneller, so können Sie längere Runs fahren und höher fliegen.\r\n&nbsp;\r\nBindung:\r\n&nbsp;\r\nDie Vice Pro Bindung sind nicht nur Close-Toe Boots mit hammer\r\nStyle, sondern es war das Ziel den Komfort von normalen Boots in eine\r\nWakeboard-Bindung einzubringen, dabei leichtgewichtig zu bleiben, und\r\ndamit perfekte Performance auf dem Wasser zu ermöglichen.\r\n\r\n    Die Wakeboard-Bindung ist in der Größe gleich bleibend, gibt also im\r\n Laufe der Zeit nicht nach und sitzt somit wie ein perfekter Schuh. Ein\r\nergonomisches und stoßabsorbierendes Fußbett sorgt für weiche\r\nLandungen.&nbsp;",
        selflinks: {
          de: 'Wakeboarding/Sets/Set-O-BRIEN-VICE-2010.html',
          eg: 'eg/oxid-oxid/oxid/2502.html',
          en: 'en/Wakeboarding/Sets/Set-O-BRIEN-VICE-2010.html',
        },
        manufacturerid: '',
        picture_url_main:
          'https://stage.makaira.io/oxid6/out/pictures/master/product/1/obrien_vice__vice_ct_boot_2010_1.jpg',
        manufacturer_title: null,
        datatype: 'makaira-product',
        images: [
          'https://stage.makaira.io/oxid6/out/pictures/master/product/1/obrien_vice__vice_ct_boot_2010_1.jpg',
        ],
      },
    },
  },
  {
    id: 'd86f775338da3228bec9e968f02e7551',
    fields: {
      id: 'd86f775338da3228bec9e968f02e7551',
      ean: '1504',
      url: 'Kiteboarding/Zubehoer/Kite-Leinen-VECTOR-QUAD-PRO.html',
      price: 35.5,
      title: 'Kite Leinen VECTOR QUAD PRO',
      active: true,
      ispseudo: false,
      longdesc:
        'Vector Kite Leinen Quad Pro 270kg\r\nVEKTOR Leinen sind besonders zur\r\nPräzisionssteuerung in allen Kite Disziplinen bestimmt. Kiteleinen sind\r\ndie einzige Verbindung zwischen Ihnen und Ihrem Kite und können darüber\r\nentscheiden, ob Ihr Kite gut oder ausgezeichnet ist. VEKTOR Leinen sind\r\ndünn, glatt, und haben minimalen Reck.\r\n\r\n           VEKTOR Leinen werden mit Dyneema® hergestellt. Diese\r\nHochleistungs-Polyäthylenfaser ist überraschender Weise 15 mal stärker\r\nals Stahl.\r\n\r\n           VEKTOR Leinen sind besonders glatt. Dadurch minimieren sie das Risiko eines Leinenbruchs. \r\n\r\n           VEKTOR Leinen sind nicht nur extrem stark, sie werden auch\r\nsehr gut gegen Wetter und damit in Verbindung stehende Einflüsse\r\ngeschützt. Der Spezialbeschichtung schützt gegen UV-Licht,\r\nTemperaturschwankungen, Sand, Salz und Wasser. Außerdem bieten die\r\nLeinen ausgezeichneten Widerstand gegen Abnutzung und Knicke.\r\n\r\n           VEKTOR Leinen sind vor-gereckt. Der minimale Reck in den\r\nVEKTOR Leinen ermöglicht eine exakte Rückmeldung des Kites und führt zu\r\neiner verbesserten Steuerung. Dank der hohen Bruchlast der VECTOR Leinen\r\n können diese dünner sein. Mit dem minimierten Windwiderstand können Sie\r\n Ihren Kite auch bei schwächeren Winden fliegen.\r\n\r\n           VEKTOR Leinen können Sie direkt aus der Verpackung verwendet\r\nwerden. Die Linien sind von gleicher Länge und vorgereckt.\r\n\r\n           Die VEKTOR Color Pro, Quad Pro und Precision Reihen werden\r\nmit genähte Loops hergestellt. Das Nähen garantiert die stärkst -\r\nmögliche Verbindung. Die glatten Verbindungen verringern die\r\nWahrscheinlichkeit der Leine Verwicklungen.\r\n\r\n           Farbcode. Nachdem der Herstellungsprozeß werden die Leinen\r\ngefärbt und PU beschichtet. Außer dem maximalen Schutzes, Laßt es Sie\r\nauf einen Blick erkennen, welche Leine wohin gehört.\r\n\r\n           VEKTOR Leinen gibt es in unterschiedlichen Ausführungen:\r\n           VEKTOR Pro Color\r\n           VEKTOR Quad Pro\r\n&nbsp;',
      selflinks: {
        de: 'Kiteboarding/Zubehoer/Kite-Leinen-VECTOR-QUAD-PRO.html',
        eg: 'eg/oxid/oxid-oxid-3/1504.html',
        en: 'en/Kiteboarding/Supplies/Kite-lines-VECTOR-QUAD-PRO.html',
      },
      manufacturerid: '',
      picture_url_main:
        'https://stage.makaira.io/oxid6/out/pictures/master/product/1/vector_kitelinen_quad_pro_1.jpg',
      manufacturer_title: null,
      datatype: 'makaira-productgroup',
      images: [
        'https://stage.makaira.io/oxid6/out/pictures/master/product/1/vector_kitelinen_quad_pro_1.jpg',
      ],
      'makaira-product': {
        id: 'e80f918712e13c1369ff2b55735313b5',
        ean: '1504',
        url: 'Kiteboarding/Zubehoer/Kite-Leinen-VECTOR-QUAD-PRO.html',
        price: 35.5,
        title: 'Kite Leinen VECTOR QUAD PRO',
        active: true,
        ispseudo: true,
        longdesc:
          'Vector Kite Leinen Quad Pro 270kg\r\nVEKTOR Leinen sind besonders zur\r\nPräzisionssteuerung in allen Kite Disziplinen bestimmt. Kiteleinen sind\r\ndie einzige Verbindung zwischen Ihnen und Ihrem Kite und können darüber\r\nentscheiden, ob Ihr Kite gut oder ausgezeichnet ist. VEKTOR Leinen sind\r\ndünn, glatt, und haben minimalen Reck.\r\n\r\n           VEKTOR Leinen werden mit Dyneema® hergestellt. Diese\r\nHochleistungs-Polyäthylenfaser ist überraschender Weise 15 mal stärker\r\nals Stahl.\r\n\r\n           VEKTOR Leinen sind besonders glatt. Dadurch minimieren sie das Risiko eines Leinenbruchs. \r\n\r\n           VEKTOR Leinen sind nicht nur extrem stark, sie werden auch\r\nsehr gut gegen Wetter und damit in Verbindung stehende Einflüsse\r\ngeschützt. Der Spezialbeschichtung schützt gegen UV-Licht,\r\nTemperaturschwankungen, Sand, Salz und Wasser. Außerdem bieten die\r\nLeinen ausgezeichneten Widerstand gegen Abnutzung und Knicke.\r\n\r\n           VEKTOR Leinen sind vor-gereckt. Der minimale Reck in den\r\nVEKTOR Leinen ermöglicht eine exakte Rückmeldung des Kites und führt zu\r\neiner verbesserten Steuerung. Dank der hohen Bruchlast der VECTOR Leinen\r\n können diese dünner sein. Mit dem minimierten Windwiderstand können Sie\r\n Ihren Kite auch bei schwächeren Winden fliegen.\r\n\r\n           VEKTOR Leinen können Sie direkt aus der Verpackung verwendet\r\nwerden. Die Linien sind von gleicher Länge und vorgereckt.\r\n\r\n           Die VEKTOR Color Pro, Quad Pro und Precision Reihen werden\r\nmit genähte Loops hergestellt. Das Nähen garantiert die stärkst -\r\nmögliche Verbindung. Die glatten Verbindungen verringern die\r\nWahrscheinlichkeit der Leine Verwicklungen.\r\n\r\n           Farbcode. Nachdem der Herstellungsprozeß werden die Leinen\r\ngefärbt und PU beschichtet. Außer dem maximalen Schutzes, Laßt es Sie\r\nauf einen Blick erkennen, welche Leine wohin gehört.\r\n\r\n           VEKTOR Leinen gibt es in unterschiedlichen Ausführungen:\r\n           VEKTOR Pro Color\r\n           VEKTOR Quad Pro\r\n&nbsp;',
        selflinks: {
          de: 'Kiteboarding/Zubehoer/Kite-Leinen-VECTOR-QUAD-PRO.html',
          eg: 'eg/oxid/oxid-oxid-3/1504.html',
          en: 'en/Kiteboarding/Supplies/Kite-lines-VECTOR-QUAD-PRO.html',
        },
        manufacturerid: '',
        picture_url_main:
          'https://stage.makaira.io/oxid6/out/pictures/master/product/1/vector_kitelinen_quad_pro_1.jpg',
        manufacturer_title: null,
        datatype: 'makaira-product',
        images: [
          'https://stage.makaira.io/oxid6/out/pictures/master/product/1/vector_kitelinen_quad_pro_1.jpg',
        ],
      },
    },
  },
  {
    id: 'dc5480c47d8cd5a9eab9da5db9159cc6',
    fields: {
      id: 'dc5480c47d8cd5a9eab9da5db9159cc6',
      ean: '1207',
      url: 'Kiteboarding/Kites/Kite-RRD-PASSION-2009.html',
      price: 699,
      title: 'Kite RRD PASSION 2009',
      active: true,
      ispseudo: false,
      longdesc:
        'RRD Passion 2009\r\nDie\r\n bewährte Linie der Hybrid Delta Kites. Eine unglaubliche\r\nLeichtwindperformance kombiniert mit einer extrem guten Depowerfähigkeit\r\n bei einem optimalen Turning Speed machen den Kite zu einem echten\r\nAllrounder. Dabei ist der Passion sehr stabil in der Luft, kraftvoll und\r\n sehr leicht zu relaunchen. Egal ob Einsteiger oder Könner, der Kite\r\ndürfte 95% aller Kiter glücklich machen. \r\nMerkmale: \r\n\r\nStabilität\r\nEnorme Power\r\nLeichtes und progressives De-Powern\r\nMittlere bis leichte Bar Haltekräfte\r\nSofortiger Re-launch\r\nTechnologie:\r\n\r\nNeues SPS System mit neu entwickeltem Ventil\r\nLE Parallel Nähte für maximale Stärke, flach genäht\r\nHeiß geklebtes Double Tape Liek\r\nPVC abgerundete Verstärkung der Enden der Querstruts\r\nMetallic PU verstärkte Quertube-Enden\r\nDP 175 LL Dacron\r\nTejin&nbsp; T9600 Canopy\r\nNeu geformte Quertube Protektoren\r\nNeue PVC Ventil Protektoren\r\n\r\nSeb Garat:\r\n\r\n               "Den Passion probierte ich das erste Mal während des\r\n2009er RRD Photo Shootings in Ägypten aus. Es ist ein Delta Shape Kite.\r\nIch probierte zuerst den 13er aus, den größten Passion Kite, da wir am\r\nersten Tag recht wenig Wind hatten. Trotzdem, der Kite vermittelt eine\r\nunglaubliche Power. Der 13er besitzt soviel Power wie ein normaler 15er\r\noder 16er Kite. Ich versuchte den ersten Sprung und es war unglaublich\r\nleicht in die Luft zu kommen. Dank dieser Power gelangen mir sogar\r\neinige Board-Off&#8217;s, sogar unter diesen Leichtwindbedingungen - es waren\r\nwohl ca. 12 Knoten -.\r\n               Der Passion verfügt auch über eine enorme Depower: wenn\r\ndu die Bar bis zum Limit wegschiebst, hast du überhaupt keine Power mehr\r\n und was das Beste ist: diese Depower ist wirklich progressiv!!\r\n\r\n               Aber den größten Vorteil dieses Kites entdeckte ich als\r\nmein Kite ins Wasser fiel während einigen unhooked Tricks: &#8222;Der Relaunch\r\n auf dem Wasser ist SO EINFACH!&#8220; Man muss fast gar nichts tun, um diesen\r\n Passion zu relaunchen. Nur an der Back Line ziehen und der Kite geht\r\nsofort zur Windfenster Seite und relaunched auf der Stelle. Vielleicht\r\nist der Kite nicht der allerbeste für einige &#8222;Handle Pass&#8220; und New\r\nSchool Tricks, aber mit den richtigen Einstellungen ist sogar das\r\nmöglich.\r\n\r\n               Mit Starkwind probierte ich auch den 9er Passion und auch\r\n dieser ist wirklich ein hervorragender Kite. Mit diesem Kite gelangen\r\nmir einige völlig unglaubliche Sprünge! Und selbstverständlich bei\r\nvölliger Kontrolle der Power.\r\n\r\n               Der Passion ist ein reiner Freeride Kite. Trotz seines\r\nmittleren &#8222;Turning Speeds&#8220; sind durchgezogene Kiteloops jederzeit\r\nmöglich!\r\n\r\n               Abschließen kann ich sagen, dass der Passion ein Kite\r\nist, der für die allermeisten Leute hervorragend geeignet ist. Es ist\r\nein sehr guter Kite zum Lernen, vor allem mit den kleinen Größen. Und er\r\n ist ebenfalls perfekt für jeden, der mit seinem Kite wirklich alles\r\nmachen will! Es ist DER Freeride Kite."\r\n&nbsp;\r\nLieferumfang:\r\n\r\nKite Passion\r\nGlobal Bar mit Leinen\r\n\r\nPumpe\r\nKitebag',
      selflinks: {
        de: 'Kiteboarding/Kites/Kite-RRD-PASSION-2009.html',
        eg: 'eg/oxid/oxid-oxid-4/1207.html',
        en: 'en/Kiteboarding/Kites/Kite-RRD-PASSION-2009.html',
      },
      manufacturerid: 'adca51c88a3caa1c7b939fd6a229ae3a',
      picture_url_main:
        'https://stage.makaira.io/oxid6/out/pictures/master/product/1/rrd_passion_2009_1.jpg',
      manufacturer_title: 'RRD',
      datatype: 'makaira-productgroup',
      images: [
        'https://stage.makaira.io/oxid6/out/pictures/master/product/1/rrd_passion_2009_1.jpg',
      ],
      'makaira-product': {
        id: '724d89012c2f7018fe6bed7cafefebc9',
        ean: '1207',
        url: 'Kiteboarding/Kites/Kite-RRD-PASSION-2009.html',
        price: 699,
        title: 'Kite RRD PASSION 2009',
        active: true,
        ispseudo: true,
        longdesc:
          'RRD Passion 2009\r\nDie\r\n bewährte Linie der Hybrid Delta Kites. Eine unglaubliche\r\nLeichtwindperformance kombiniert mit einer extrem guten Depowerfähigkeit\r\n bei einem optimalen Turning Speed machen den Kite zu einem echten\r\nAllrounder. Dabei ist der Passion sehr stabil in der Luft, kraftvoll und\r\n sehr leicht zu relaunchen. Egal ob Einsteiger oder Könner, der Kite\r\ndürfte 95% aller Kiter glücklich machen. \r\nMerkmale: \r\n\r\nStabilität\r\nEnorme Power\r\nLeichtes und progressives De-Powern\r\nMittlere bis leichte Bar Haltekräfte\r\nSofortiger Re-launch\r\nTechnologie:\r\n\r\nNeues SPS System mit neu entwickeltem Ventil\r\nLE Parallel Nähte für maximale Stärke, flach genäht\r\nHeiß geklebtes Double Tape Liek\r\nPVC abgerundete Verstärkung der Enden der Querstruts\r\nMetallic PU verstärkte Quertube-Enden\r\nDP 175 LL Dacron\r\nTejin&nbsp; T9600 Canopy\r\nNeu geformte Quertube Protektoren\r\nNeue PVC Ventil Protektoren\r\n\r\nSeb Garat:\r\n\r\n               "Den Passion probierte ich das erste Mal während des\r\n2009er RRD Photo Shootings in Ägypten aus. Es ist ein Delta Shape Kite.\r\nIch probierte zuerst den 13er aus, den größten Passion Kite, da wir am\r\nersten Tag recht wenig Wind hatten. Trotzdem, der Kite vermittelt eine\r\nunglaubliche Power. Der 13er besitzt soviel Power wie ein normaler 15er\r\noder 16er Kite. Ich versuchte den ersten Sprung und es war unglaublich\r\nleicht in die Luft zu kommen. Dank dieser Power gelangen mir sogar\r\neinige Board-Off&#8217;s, sogar unter diesen Leichtwindbedingungen - es waren\r\nwohl ca. 12 Knoten -.\r\n               Der Passion verfügt auch über eine enorme Depower: wenn\r\ndu die Bar bis zum Limit wegschiebst, hast du überhaupt keine Power mehr\r\n und was das Beste ist: diese Depower ist wirklich progressiv!!\r\n\r\n               Aber den größten Vorteil dieses Kites entdeckte ich als\r\nmein Kite ins Wasser fiel während einigen unhooked Tricks: &#8222;Der Relaunch\r\n auf dem Wasser ist SO EINFACH!&#8220; Man muss fast gar nichts tun, um diesen\r\n Passion zu relaunchen. Nur an der Back Line ziehen und der Kite geht\r\nsofort zur Windfenster Seite und relaunched auf der Stelle. Vielleicht\r\nist der Kite nicht der allerbeste für einige &#8222;Handle Pass&#8220; und New\r\nSchool Tricks, aber mit den richtigen Einstellungen ist sogar das\r\nmöglich.\r\n\r\n               Mit Starkwind probierte ich auch den 9er Passion und auch\r\n dieser ist wirklich ein hervorragender Kite. Mit diesem Kite gelangen\r\nmir einige völlig unglaubliche Sprünge! Und selbstverständlich bei\r\nvölliger Kontrolle der Power.\r\n\r\n               Der Passion ist ein reiner Freeride Kite. Trotz seines\r\nmittleren &#8222;Turning Speeds&#8220; sind durchgezogene Kiteloops jederzeit\r\nmöglich!\r\n\r\n               Abschließen kann ich sagen, dass der Passion ein Kite\r\nist, der für die allermeisten Leute hervorragend geeignet ist. Es ist\r\nein sehr guter Kite zum Lernen, vor allem mit den kleinen Größen. Und er\r\n ist ebenfalls perfekt für jeden, der mit seinem Kite wirklich alles\r\nmachen will! Es ist DER Freeride Kite."\r\n&nbsp;\r\nLieferumfang:\r\n\r\nKite Passion\r\nGlobal Bar mit Leinen\r\n\r\nPumpe\r\nKitebag',
        selflinks: {
          de: 'Kiteboarding/Kites/Kite-RRD-PASSION-2009.html',
          eg: 'eg/oxid/oxid-oxid-4/1207.html',
          en: 'en/Kiteboarding/Kites/Kite-RRD-PASSION-2009.html',
        },
        manufacturerid: 'adca51c88a3caa1c7b939fd6a229ae3a',
        picture_url_main:
          'https://stage.makaira.io/oxid6/out/pictures/master/product/1/rrd_passion_2009_1.jpg',
        manufacturer_title: 'RRD',
        datatype: 'makaira-product',
        images: [
          'https://stage.makaira.io/oxid6/out/pictures/master/product/1/rrd_passion_2009_1.jpg',
        ],
      },
    },
  },
  {
    id: 'dc55b2b2e633527f9a8b2408a032f28f',
    fields: {
      id: 'dc55b2b2e633527f9a8b2408a032f28f',
      ean: '3504',
      url: 'Bekleidung/Fashion/Accessoires/Kuyichi-Guertel-JUNO.html',
      price: 24.9,
      title: 'Kuyichi Gürtel JUNO',
      active: true,
      ispseudo: false,
      longdesc:
        'Kuyichi Gürtel Juno\r\n&nbsp;\r\nModischer Gürtel von Kuychi für Sie und Ihn.\r\n\r\nGürtel mit eingesticktem Kuyichi-Logo\r\nRobuste Edelstahlschnalle',
      selflinks: {
        de: 'Bekleidung/Fashion/Accessoires/Kuyichi-Guertel-JUNO.html',
        eg: 'eg/oxid/oxid-oxid-1/oxid-oxid/3504.html',
        en: 'en/Gear/Fashion/Accessories/Kuyichi-belt-JUNO.html',
      },
      manufacturerid: '9434afb379a46d6c141de9c9e5b94fcf',
      picture_url_main:
        'https://stage.makaira.io/oxid6/out/pictures/master/product/1/p1170203_1.jpg',
      manufacturer_title: 'Kuyichi',
      datatype: 'makaira-productgroup',
      images: [
        'https://stage.makaira.io/oxid6/out/pictures/master/product/1/p1170203_1.jpg',
      ],
      'makaira-product': {
        id: 'b4d819e92a3c7711880a9a4e5daacc12',
        ean: '3504',
        url: 'Bekleidung/Fashion/Accessoires/Kuyichi-Guertel-JUNO.html',
        price: 24.9,
        title: 'Kuyichi Gürtel JUNO',
        active: true,
        ispseudo: true,
        longdesc:
          'Kuyichi Gürtel Juno\r\n&nbsp;\r\nModischer Gürtel von Kuychi für Sie und Ihn.\r\n\r\nGürtel mit eingesticktem Kuyichi-Logo\r\nRobuste Edelstahlschnalle',
        selflinks: {
          de: 'Bekleidung/Fashion/Accessoires/Kuyichi-Guertel-JUNO.html',
          eg: 'eg/oxid/oxid-oxid-1/oxid-oxid/3504.html',
          en: 'en/Gear/Fashion/Accessories/Kuyichi-belt-JUNO.html',
        },
        manufacturerid: '9434afb379a46d6c141de9c9e5b94fcf',
        picture_url_main:
          'https://stage.makaira.io/oxid6/out/pictures/master/product/1/p1170203_1.jpg',
        manufacturer_title: 'Kuyichi',
        datatype: 'makaira-product',
        images: [
          'https://stage.makaira.io/oxid6/out/pictures/master/product/1/p1170203_1.jpg',
        ],
      },
    },
  },
  {
    id: 'dc57391739360d306c8dfcb3a4295e19',
    fields: {
      id: 'dc57391739360d306c8dfcb3a4295e19',
      ean: '1206',
      url: 'Kiteboarding/Kites/Kite-RRD-PASSION-2010.html',
      price: 589,
      title: 'Kite RRD PASSION 2010',
      active: true,
      ispseudo: false,
      longdesc:
        'RRD Passion 2010 \r\n\r\nDieser Kite überrascht total:\r\nStabil, kraftvoll und sehr einfach zu relaunchen sowie zu depowern!\r\nDieser Kite gibt jedem das Gefühl, dass er schon immer kiten konnte. Der\r\n neue Passion wurde komplett überarbeitet so dass seine Kraft und\r\nStabilität voll zur Geltung kommen.\r\nEigenschaften:\r\n\r\n\r\n\r\nStabilität\r\nKraftvoll\r\nLeichte progressive Depower\r\nMittlere/leichte Bar Druck\r\nSOFORTIGER Relaunch\r\n\r\nTechnologie:\r\n\r\nNeues SPS System mit einem neu entworfenen Ventil\r\nLeading Edge mit parallelen Nähten für maximale Haltbarkeit und geringere Dehnung\r\nheiß geklebtes Double Tape Liek\r\nPVC abgerundete Verstärkung an den Enden der Querstuts\r\nMetallic-PU verstärkte Quertube-Enden\r\nDP 175 LL Dacron\r\nTejin T9600 Canopy\r\nNeu geformte Quertube-Protektoren\r\nNeue PVC-Ventilprotektoren\r\nGrößen:\r\n   13.0 | 11.0 | 9.0 | 7.0 | 5.0 | 3.0\r\n\r\nLieferumfang:\r\n\r\n\r\nKite Passion\r\nKitebag',
      selflinks: {
        de: 'Kiteboarding/Kites/Kite-RRD-PASSION-2010.html',
        eg: 'eg/oxid/oxid-oxid-4/1206.html',
        en: 'en/Kiteboarding/Kites/Kite-RRD-PASSION-2010.html',
      },
      manufacturerid: 'adca51c88a3caa1c7b939fd6a229ae3a',
      picture_url_main:
        'https://stage.makaira.io/oxid6/out/pictures/master/product/1/rrd_passion_2010_1.jpg',
      manufacturer_title: 'RRD',
      datatype: 'makaira-productgroup',
      images: [
        'https://stage.makaira.io/oxid6/out/pictures/master/product/1/rrd_passion_2010_1.jpg',
      ],
      'makaira-product': {
        id: '7238637b3badad2cb8ac3e56f14903da',
        ean: '1206',
        url: 'Kiteboarding/Kites/Kite-RRD-PASSION-2010.html',
        price: 589,
        title: 'Kite RRD PASSION 2010',
        active: true,
        ispseudo: true,
        longdesc:
          'RRD Passion 2010 \r\n\r\nDieser Kite überrascht total:\r\nStabil, kraftvoll und sehr einfach zu relaunchen sowie zu depowern!\r\nDieser Kite gibt jedem das Gefühl, dass er schon immer kiten konnte. Der\r\n neue Passion wurde komplett überarbeitet so dass seine Kraft und\r\nStabilität voll zur Geltung kommen.\r\nEigenschaften:\r\n\r\n\r\n\r\nStabilität\r\nKraftvoll\r\nLeichte progressive Depower\r\nMittlere/leichte Bar Druck\r\nSOFORTIGER Relaunch\r\n\r\nTechnologie:\r\n\r\nNeues SPS System mit einem neu entworfenen Ventil\r\nLeading Edge mit parallelen Nähten für maximale Haltbarkeit und geringere Dehnung\r\nheiß geklebtes Double Tape Liek\r\nPVC abgerundete Verstärkung an den Enden der Querstuts\r\nMetallic-PU verstärkte Quertube-Enden\r\nDP 175 LL Dacron\r\nTejin T9600 Canopy\r\nNeu geformte Quertube-Protektoren\r\nNeue PVC-Ventilprotektoren\r\nGrößen:\r\n   13.0 | 11.0 | 9.0 | 7.0 | 5.0 | 3.0\r\n\r\nLieferumfang:\r\n\r\n\r\nKite Passion\r\nKitebag',
        selflinks: {
          de: 'Kiteboarding/Kites/Kite-RRD-PASSION-2010.html',
          eg: 'eg/oxid/oxid-oxid-4/1206.html',
          en: 'en/Kiteboarding/Kites/Kite-RRD-PASSION-2010.html',
        },
        manufacturerid: 'adca51c88a3caa1c7b939fd6a229ae3a',
        picture_url_main:
          'https://stage.makaira.io/oxid6/out/pictures/master/product/1/rrd_passion_2010_1.jpg',
        manufacturer_title: 'RRD',
        datatype: 'makaira-product',
        images: [
          'https://stage.makaira.io/oxid6/out/pictures/master/product/1/rrd_passion_2010_1.jpg',
        ],
      },
    },
  },
  {
    id: 'adc5ee42bd3c37a27a488769d22ad9ed',
    fields: {
      id: 'adc5ee42bd3c37a27a488769d22ad9ed',
      ean: '3102',
      url: 'Bekleidung/Sportswear/Neopren/Anzuege/Neoprenanzug-NPX-VAMP.html',
      price: 179,
      title: 'Neoprenanzug NPX VAMP',
      active: true,
      ispseudo: false,
      longdesc:
        'NPX Vamp Semidry 5/4/3 GBL 2010\r\n\r\nWie der Cult für Männer, ist der\r\nVamp ein preiswerter Neoprenanzug für Frauen, der trotzdem den NPX\r\nAnsprüchen gerecht wird. Ein auffälliges Design soll vor allem auch die\r\njüngere Generation ansprechen. \r\nKonstruktion:\r\n\r\n40% Apex Neopren an den Schulter und Unterarmbahnen\r\n60% Dura Neopren im&nbsp; restlichen Anzug\r\nGBL Nähte\r\nAusstattungsmerkmale:\r\n\r\nCharcoal Kontrast Naht\r\nElastische Schlaufe für den Schlüssel an der inneren Rückenbahn\r\nKlettband zum leichteren Ziehen des Reißverschlusses\r\nTPU Knie Pads\r\nCinch Loop Beinabschlüsse\r\nAbnehmbare Cinch Loop Beinabschlüsse&nbsp;\r\nChromoplast Aufdruck',
      selflinks: {
        de: 'Bekleidung/Sportswear/Neopren/Anzuege/Neoprenanzug-NPX-VAMP.html',
        eg: 'eg/oxid-oxid-1/oxid/oxid/oxid-oxid/3102.html',
        en: 'en/Gear/Sportswear/Neoprene/Suits/Wetsuit-NPX-VAMP.html',
      },
      manufacturerid: 'dc5ec524a9aa6175cf7a498d70ce510a',
      picture_url_main:
        'https://stage.makaira.io/oxid6/out/pictures/master/product/1/vamp_su9448_z1.jpg',
      manufacturer_title: 'NPX',
      datatype: 'makaira-productgroup',
      images: [
        'https://stage.makaira.io/oxid6/out/pictures/master/product/1/vamp_su9448_z1.jpg',
      ],
      'makaira-product': {
        id: '1680252f4a5b36063db7a88c0ebe1434',
        ean: '111111',
        url: 'Bekleidung/Sportswear/Neopren/Anzuege/Neoprenanzug-NPX-VAMP.html',
        price: 123,
        title: 'Neoprenanzug NPX VAMP',
        active: true,
        ispseudo: false,
        longdesc:
          'NPX Vamp Semidry 5/4/3 GBL 2010\r\n\r\nWie der Cult für Männer, ist der\r\nVamp ein preiswerter Neoprenanzug für Frauen, der trotzdem den NPX\r\nAnsprüchen gerecht wird. Ein auffälliges Design soll vor allem auch die\r\njüngere Generation ansprechen. \r\nKonstruktion:\r\n\r\n40% Apex Neopren an den Schulter und Unterarmbahnen\r\n60% Dura Neopren im&nbsp; restlichen Anzug\r\nGBL Nähte\r\nAusstattungsmerkmale:\r\n\r\nCharcoal Kontrast Naht\r\nElastische Schlaufe für den Schlüssel an der inneren Rückenbahn\r\nKlettband zum leichteren Ziehen des Reißverschlusses\r\nTPU Knie Pads\r\nCinch Loop Beinabschlüsse\r\nAbnehmbare Cinch Loop Beinabschlüsse&nbsp;\r\nChromoplast Aufdruck',
        selflinks: {
          de: 'Bekleidung/Sportswear/Neopren/Anzuege/Neoprenanzug-NPX-VAMP.html',
          eg: 'eg/oxid-oxid-1/oxid/oxid/oxid-oxid/3102.html',
          en: 'en/Gear/Sportswear/Neoprene/Suits/Wetsuit-NPX-VAMP.html',
        },
        manufacturerid: 'dc5ec524a9aa6175cf7a498d70ce510a',
        picture_url_main:
          'https://stage.makaira.io/oxid6/out/pictures/master/product/1/vamp_su9448_z1.jpg',
        manufacturer_title: 'NPX',
        datatype: 'makaira-product',
        images: [
          'https://stage.makaira.io/oxid6/out/pictures/master/product/1/vamp_su9448_z1.jpg',
        ],
      },
    },
  },
  {
    id: '6b66d82af984e5ad46b9cb27b1ef8aae',
    fields: {
      id: '6b66d82af984e5ad46b9cb27b1ef8aae',
      ean: '3572',
      url: 'Bekleidung/Fashion/Fuer-Sie/Jeans/Kuyichi-Jeans-SUGAR.html',
      price: 89.9,
      title: 'Kuyichi Jeans SUGAR',
      active: true,
      ispseudo: false,
      longdesc:
        'Kuyichi Jeans Sugar, das Spitzenjeansmodell in verschiedenen Waschungen. Die Jeans sitzt lässig auf der Hüfte und ist mit breitem, geraden Beinschnitt. Tiefgesetzte, große Taschen sorgen für einen knackigen Hintern\r\n\r\n\r\n100% ökologisch angebaute Baumwolle, 100% Fair Trade.',
      selflinks: {
        de: 'Bekleidung/Fashion/Fuer-Sie/Jeans/Kuyichi-Jeans-SUGAR.html',
        eg: 'eg/oxid/oxid/oxid/oxid-oxid/3572.html',
        en: 'en/Gear/Fashion/For-Her/Jeans/Kuyichi-Jeans-SUGAR.html',
      },
      manufacturerid: '9434afb379a46d6c141de9c9e5b94fcf',
      picture_url_main:
        'https://stage.makaira.io/oxid6/out/pictures/master/product/1/front_z1(9).jpg',
      manufacturer_title: 'Kuyichi',
      datatype: 'makaira-productgroup',
      images: [
        'https://stage.makaira.io/oxid6/out/pictures/master/product/1/front_z1(9).jpg',
      ],
      'makaira-product': {
        id: '6b6b9f89cb8decee837d1a4c60742875',
        ean: '85-8573-846-6-4',
        url: 'Bekleidung/Fashion/Fuer-Sie/Jeans/Kuyichi-Jeans-SUGAR.html',
        price: 89.9,
        title: 'Kuyichi Jeans SUGAR',
        active: true,
        ispseudo: false,
        longdesc:
          'Kuyichi\r\n Jeans Sugar, das Spitzenjeansmodell in verschiedenen Waschungen. Die\r\nJeans sitzt lässig auf der Hüfte und ist mit breitem, geraden\r\nBeinschnitt. Tiefgesetzte, große Taschen sorgen für einen knackigen\r\nHintern\r\n\r\n\r\n100% ökologisch angebaute Baumwolle, 100% Fair Trade.',
        selflinks: {
          de: 'Bekleidung/Fashion/Fuer-Sie/Jeans/Kuyichi-Jeans-SUGAR.html',
          eg: 'eg/oxid/oxid/oxid/oxid-oxid/3572.html',
          en: 'en/Gear/Fashion/For-Her/Jeans/Kuyichi-Jeans-SUGAR.html',
        },
        manufacturerid: '9434afb379a46d6c141de9c9e5b94fcf',
        picture_url_main:
          'https://stage.makaira.io/oxid6/out/pictures/master/product/1/front_z1(9).jpg',
        manufacturer_title: 'Kuyichi',
        datatype: 'makaira-product',
        images: [
          'https://stage.makaira.io/oxid6/out/pictures/master/product/1/front_z1(9).jpg',
        ],
      },
    },
  },
  {
    id: 'b56c560872da93602ff88c7267eb4774',
    fields: {
      id: 'b56c560872da93602ff88c7267eb4774',
      ean: '1210',
      url: 'Kiteboarding/Kites/Kite-NAISH-PARK-2011.html',
      price: 719,
      title: 'Kite NAISH PARK 2011',
      active: true,
      ispseudo: false,
      longdesc:
        'Naish Park 2011 - nur Kite\r\nDesignziel:  Rider, die eine unkomplizierte, schnörkellose Performance suchen.\r\n    Als ein „Rundum-sorglos-Paket“ ist der Park ist ein auf Performance fokussierter Kite.\r\n\r\n    Das Design des Park mit drei Struts ist stabil und reaktionsschnell.\r\n Diese Konfiguration gibt dem Park in Kombination mit seinem\r\nausgeprägten Profil und seiner vollen Outline den beständigen Zug eines\r\n„C“-Kites und die Power und Kontrolle eines Swept Kites.\r\n\r\n    Die nach hinten geschwungene Fronttube positioniert die Wing Tips\r\nhinter dem Zentrum des Kites, was die Relaunch-Fähigkeiten verbessert\r\nund die Depower maximiert.\r\n\r\n    Die “Einer-für-Alles” Charakteristik des Park eröffnet dem Rider\r\neinen breiten Einsatzbereich. Er ist das perfekte Werkzeug, egal ob sie\r\nsich auf Handle-Pass-Rotation konzentrieren, die Wellenlippe rippen,\r\noder einfach nur Ihre Freeride-Zeit auf dem Wasser verlängern möchten.\r\n\r\n    Der Park ist kompatibel  zum LWR-System (Leichtwind-Relaunch).\r\n\r\nArtikelmerkmale:\r\n\r\nDrei-Strut-Kite mit supergeringem Gewicht\r\n    perfekt für Leichtwindeinsatz und unglaublich spielerisches Handling\r\nSwept-Compact-C–C-Outline\r\n    für hohe schnelle Turns und Freestylepower kombiniert\r\n    geschwungene Wingtips für bessere Depower und vereinfachten Wasserstart\r\nSolid-Frame\r\n    mehr Stabilität durch Befestigung jedes Struts mit Schwerlast-Dacron auf der Canopy\r\nOptionaler Leichtwind-Relaunch(LWR)\r\n    mit 5.LWR-Leine für Wasserstart bei nahezu null Wind\r\nOctopus One-PumpSystem\r\n    mit neuem One-Way-Inflation-Ventil für noch einfacheres Aufpumpen\r\nDirekter Zugang zu den Struts über Reißverschluss für unkomplizierten Bladderwechsel\r\n4-Lines (20m)\r\nLieferumfang:\r\n\r\n Kite\r\nTasche\r\nReparatur-Kit\r\nInternationale Garantie\r\nAnleitung',
      selflinks: {
        de: 'Kiteboarding/Kites/Kite-NAISH-PARK-2011.html',
        eg: 'eg/oxid/oxid-oxid-4/1210.html',
        en: 'en/Kiteboarding/Kites/Kite-NAISH-PARK-2011.html',
      },
      manufacturerid: '90a8a18dd0cf0e7aec5238f30e1c6106',
      picture_url_main:
        'https://stage.makaira.io/oxid6/out/pictures/master/product/1/naish_park_2011_1.jpg',
      manufacturer_title: 'Naish',
      datatype: 'makaira-productgroup',
      images: [
        'https://stage.makaira.io/oxid6/out/pictures/master/product/1/naish_park_2011_1.jpg',
      ],
      'makaira-product': {
        id: '2f5e1a75016e71f5264bad6d8b8bc879',
        ean: '1210',
        url: 'Kiteboarding/Kites/Kite-NAISH-PARK-2011.html',
        price: 719,
        title: 'Kite NAISH PARK 2011',
        active: true,
        ispseudo: true,
        longdesc:
          'Naish Park 2011 - nur Kite\r\nDesignziel:  Rider, die eine unkomplizierte, schnörkellose Performance suchen.\r\n    Als ein „Rundum-sorglos-Paket“ ist der Park ist ein auf Performance fokussierter Kite.\r\n\r\n    Das Design des Park mit drei Struts ist stabil und reaktionsschnell.\r\n Diese Konfiguration gibt dem Park in Kombination mit seinem\r\nausgeprägten Profil und seiner vollen Outline den beständigen Zug eines\r\n„C“-Kites und die Power und Kontrolle eines Swept Kites.\r\n\r\n    Die nach hinten geschwungene Fronttube positioniert die Wing Tips\r\nhinter dem Zentrum des Kites, was die Relaunch-Fähigkeiten verbessert\r\nund die Depower maximiert.\r\n\r\n    Die “Einer-für-Alles” Charakteristik des Park eröffnet dem Rider\r\neinen breiten Einsatzbereich. Er ist das perfekte Werkzeug, egal ob sie\r\nsich auf Handle-Pass-Rotation konzentrieren, die Wellenlippe rippen,\r\noder einfach nur Ihre Freeride-Zeit auf dem Wasser verlängern möchten.\r\n\r\n    Der Park ist kompatibel  zum LWR-System (Leichtwind-Relaunch).\r\n\r\nArtikelmerkmale:\r\n\r\nDrei-Strut-Kite mit supergeringem Gewicht\r\n    perfekt für Leichtwindeinsatz und unglaublich spielerisches Handling\r\nSwept-Compact-C–C-Outline\r\n    für hohe schnelle Turns und Freestylepower kombiniert\r\n    geschwungene Wingtips für bessere Depower und vereinfachten Wasserstart\r\nSolid-Frame\r\n    mehr Stabilität durch Befestigung jedes Struts mit Schwerlast-Dacron auf der Canopy\r\nOptionaler Leichtwind-Relaunch(LWR)\r\n    mit 5.LWR-Leine für Wasserstart bei nahezu null Wind\r\nOctopus One-PumpSystem\r\n    mit neuem One-Way-Inflation-Ventil für noch einfacheres Aufpumpen\r\nDirekter Zugang zu den Struts über Reißverschluss für unkomplizierten Bladderwechsel\r\n4-Lines (20m)\r\nLieferumfang:\r\n\r\n Kite\r\nTasche\r\nReparatur-Kit\r\nInternationale Garantie\r\nAnleitung',
        selflinks: {
          de: 'Kiteboarding/Kites/Kite-NAISH-PARK-2011.html',
          eg: 'eg/oxid/oxid-oxid-4/1210.html',
          en: 'en/Kiteboarding/Kites/Kite-NAISH-PARK-2011.html',
        },
        manufacturerid: '90a8a18dd0cf0e7aec5238f30e1c6106',
        picture_url_main:
          'https://stage.makaira.io/oxid6/out/pictures/master/product/1/naish_park_2011_1.jpg',
        manufacturer_title: 'Naish',
        datatype: 'makaira-product',
        images: [
          'https://stage.makaira.io/oxid6/out/pictures/master/product/1/naish_park_2011_1.jpg',
        ],
      },
    },
  },
  {
    id: '531b537118f5f4d7a427cdb825440922',
    fields: {
      id: '531b537118f5f4d7a427cdb825440922',
      ean: '3570',
      url: 'Bekleidung/Fashion/Fuer-Sie/Jeans/Kuyichi-Jeans-ANNA.html',
      price: 99.9,
      title: 'Kuyichi Jeans ANNA',
      active: true,
      ispseudo: false,
      longdesc:
        'Eine lockere und lässige Damenjeans von Kuyichi mit individuell einstellbarem Bund und lockerer Passform, gerade geschnitten.\r\n\r\n100% ökologisch angebaute Baumwolle, 100% Fair Trade.',
      selflinks: {
        de: 'Bekleidung/Fashion/Fuer-Sie/Jeans/Kuyichi-Jeans-ANNA.html',
        eg: 'eg/oxid/oxid/oxid/oxid-oxid/3570.html',
        en: 'en/Gear/Fashion/For-Her/Jeans/Kuyichi-Jeans-ANNA.html',
      },
      manufacturerid: '9434afb379a46d6c141de9c9e5b94fcf',
      picture_url_main:
        'https://stage.makaira.io/oxid6/out/pictures/master/product/1/front(4)_v_pi.jpg',
      manufacturer_title: 'Kuyichi',
      datatype: 'makaira-productgroup',
      images: [
        'https://stage.makaira.io/oxid6/out/pictures/master/product/1/front(4)_v_pi.jpg',
      ],
      'makaira-product': {
        id: '6b6efaa522be53c3e86fdb41f0542a8a',
        ean: '0702-85-853-1-1',
        url: 'Bekleidung/Fashion/Fuer-Sie/Jeans/Kuyichi-Jeans-ANNA.html',
        price: 99.9,
        title: 'Kuyichi Jeans ANNA',
        active: true,
        ispseudo: false,
        longdesc:
          'Eine lockere und lässige Damenjeans von Kuyichi mit individuell einstellbarem Bund und lockerer Passform, gerade geschnitten.\r\n\r\n100% ökologisch angebaute Baumwolle, 100% Fair Trade.',
        selflinks: {
          de: 'Bekleidung/Fashion/Fuer-Sie/Jeans/Kuyichi-Jeans-ANNA.html',
          eg: 'eg/oxid/oxid/oxid/oxid-oxid/3570.html',
          en: 'en/Gear/Fashion/For-Her/Jeans/Kuyichi-Jeans-ANNA.html',
        },
        manufacturerid: '9434afb379a46d6c141de9c9e5b94fcf',
        picture_url_main:
          'https://stage.makaira.io/oxid6/out/pictures/master/product/1/front(4)_v_pi.jpg',
        manufacturer_title: 'Kuyichi',
        datatype: 'makaira-product',
        images: [
          'https://stage.makaira.io/oxid6/out/pictures/master/product/1/front(4)_v_pi.jpg',
        ],
      },
    },
  },
  {
    id: 'f4f73033cf5045525644042325355732',
    fields: {
      id: 'f4f73033cf5045525644042325355732',
      ean: '3788',
      url: 'Angebote/Transportcontainer-THE-BARREL.html',
      price: 24.95,
      title: 'Transportcontainer THE BARREL',
      active: true,
      ispseudo: false,
      longdesc:
        'Praktischer, leichter und faltbarer Transportcontainer.\r\n\r\nWenn man ihn nicht braucht kann man ihn platzsparend\r\neinschrumpfen. Ob für schmutzige Wäsche, nasse Surfklamotten, kühle\r\nGetränke am Strand oder einfach als coolen Stauraum, nur mit einem Griff\r\n baut sich der Container durch die Pop-Up-Mechanik selbst auf.\r\n\r\n       Sehr gut verarbeitet und mit stabilen Tragegriffen und Doppelwand\r\n ist der Container wasserdicht, isoliert und durch eine\r\nReisverschlussklappe zu verschließen.\r\nHinweis: Der Container kann individuell nach Ihren Wünschen bedruckt werden. Geben Sie den gewünschten Text einfach in das dafür vorgesehene Feld ein. \r\nMaße:\r\n\r\nHöhe: 12cm (geschlossen), 43cm (offen) \r\n\r\nDurchmesser: 42cm\r\n Bezugshinweis: Bei Interesse können Sie dieses Produkt bei www.mikejucker.com\r\nerwerben.',
      selflinks: {
        de: 'Angebote/Transportcontainer-THE-BARREL.html',
        eg: 'eg/oxid-oxid-2/3788.html',
        en: 'en/Special-Offers/Transport-container-BARREL.html',
      },
      manufacturerid: '3a9fd0ec4b41d001e770b1d2d7af3e73',
      picture_url_main:
        'https://stage.makaira.io/oxid6/out/pictures/master/product/1/mikejucker_textilcontainer_1.jpg',
      manufacturer_title: 'Jucker Hawaii',
      datatype: 'makaira-productgroup',
      images: [
        'https://stage.makaira.io/oxid6/out/pictures/master/product/1/mikejucker_textilcontainer_1.jpg',
      ],
      'makaira-product': {
        id: '44c145b202736e650c37bf14efd12b7b',
        ean: '3788',
        url: 'Angebote/Transportcontainer-THE-BARREL.html',
        price: 24.95,
        title: 'Transportcontainer THE BARREL',
        active: true,
        ispseudo: true,
        longdesc:
          'Praktischer, leichter und faltbarer Transportcontainer.\r\n\r\nWenn man ihn nicht braucht kann man ihn platzsparend\r\neinschrumpfen. Ob für schmutzige Wäsche, nasse Surfklamotten, kühle\r\nGetränke am Strand oder einfach als coolen Stauraum, nur mit einem Griff\r\n baut sich der Container durch die Pop-Up-Mechanik selbst auf.\r\n\r\n       Sehr gut verarbeitet und mit stabilen Tragegriffen und Doppelwand\r\n ist der Container wasserdicht, isoliert und durch eine\r\nReisverschlussklappe zu verschließen.\r\nHinweis: Der Container kann individuell nach Ihren Wünschen bedruckt werden. Geben Sie den gewünschten Text einfach in das dafür vorgesehene Feld ein. \r\nMaße:\r\n\r\nHöhe: 12cm (geschlossen), 43cm (offen) \r\n\r\nDurchmesser: 42cm\r\n Bezugshinweis: Bei Interesse können Sie dieses Produkt bei www.mikejucker.com\r\nerwerben.',
        selflinks: {
          de: 'Angebote/Transportcontainer-THE-BARREL.html',
          eg: 'eg/oxid-oxid-2/3788.html',
          en: 'en/Special-Offers/Transport-container-BARREL.html',
        },
        manufacturerid: '3a9fd0ec4b41d001e770b1d2d7af3e73',
        picture_url_main:
          'https://stage.makaira.io/oxid6/out/pictures/master/product/1/mikejucker_textilcontainer_1.jpg',
        manufacturer_title: 'Jucker Hawaii',
        datatype: 'makaira-product',
        images: [
          'https://stage.makaira.io/oxid6/out/pictures/master/product/1/mikejucker_textilcontainer_1.jpg',
        ],
      },
    },
  },
]
