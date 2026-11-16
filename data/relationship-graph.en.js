// СГЕНЕРИРОВАНО wiki-src/scripts/build-graph-data.mjs — руками не править.
// Источник: wiki-src/src/data/relationship-graph.json + frontmatter статей персонажей.
// Потребитель: js/view-mode.js -> window.RelationshipGraph (graph/relationship-graph-core.js).
window.RELATIONSHIP_GRAPH = {
  "nodes": [
    {
      "id": "lucia-caminos",
      "name": "Lucia Caminos",
      "img": "lucia-caminos-256.webp",
      "role": "Protagonist",
      "desc": "Who is Lucia Caminos in GTA 6? Backstory, prison release, her role alongside Jason, and every confirmed detail from the trailers — verified sources only.",
      "url": "/wiki/characters/lucia-caminos/"
    },
    {
      "id": "jason-duval",
      "name": "Jason Duval",
      "img": "jason-duval-256.webp",
      "role": "Protagonist",
      "desc": "Who is Jason Duval in GTA 6? Army past, life in the Leonida Keys, his ties to smuggler Brian Heder and his story with Lucia — verified facts only.",
      "url": "/wiki/characters/jason-duval/"
    },
    {
      "id": "brian-heder",
      "name": "Brian Heder",
      "img": "brian-heder-256.webp",
      "role": "Keys smuggler",
      "desc": "Who is Brian Heder in GTA 6? Veteran Keys smuggler running a boat yard with his wife Lori — Jason's landlord and first employer, voiced by Stephen Root.",
      "url": "/wiki/characters/brian-heder/"
    },
    {
      "id": "cal-hampton",
      "name": "Cal Hampton",
      "img": "cal-hampton-256.webp",
      "role": "Keys associate",
      "desc": "Who is Cal Hampton in GTA 6? Jason's conspiracy-theorist friend who monitors Coast Guard radio from his couch — every confirmed detail so far.",
      "url": "/wiki/characters/cal-hampton/"
    },
    {
      "id": "boobie-ike",
      "name": "Boobie Ike",
      "img": "boobie-ike-256.webp",
      "role": "Vice City mogul",
      "desc": "Who is Boobie Ike in GTA 6? The Vice City legend who turned street money into real estate, a strip club and Only Raw Records — verified facts only.",
      "url": "/wiki/characters/boobie-ike/"
    },
    {
      "id": "drequan-priest",
      "name": "Dre'Quan Priest",
      "img": "drequan-priest-256.webp",
      "role": "Label boss",
      "desc": "Who is Dre'Quan Priest in GTA 6? The label boss behind Only Raw Records who signed Real Dimez and wants the whole Vice City music scene.",
      "url": "/wiki/characters/drequan-priest/"
    },
    {
      "id": "real-dimez",
      "name": "Real Dimez",
      "img": "real-dimez-256.webp",
      "role": "Rap duo",
      "desc": "Who are Real Dimez in GTA 6? Bae-Luxe and Roxy, the rapper duo signed to Only Raw Records, and their path into the Vice City music scene.",
      "url": "/wiki/characters/real-dimez/"
    },
    {
      "id": "raul-bautista",
      "name": "Raul Bautista",
      "img": "raul-bautista-256.webp",
      "role": "Heist recruiter",
      "desc": "Who is Raul Bautista in GTA 6? The bank robber assembling teams for the biggest robberies — and the clearest official signal that heists return.",
      "url": "/wiki/characters/raul-bautista/"
    }
  ],
  "edges": [
    {
      "source": "lucia-caminos",
      "target": "jason-duval",
      "type": "romantic",
      "status": "confirmed"
    },
    {
      "source": "brian-heder",
      "target": "jason-duval",
      "type": "boss",
      "status": "confirmed"
    },
    {
      "source": "brian-heder",
      "target": "cal-hampton",
      "type": "associate",
      "status": "confirmed"
    },
    {
      "source": "jason-duval",
      "target": "cal-hampton",
      "type": "ally",
      "status": "confirmed"
    },
    {
      "source": "boobie-ike",
      "target": "drequan-priest",
      "type": "ally",
      "status": "confirmed"
    },
    {
      "source": "drequan-priest",
      "target": "real-dimez",
      "type": "boss",
      "status": "confirmed"
    },
    {
      "source": "boobie-ike",
      "target": "real-dimez",
      "type": "associate",
      "status": "confirmed"
    },
    {
      "source": "boobie-ike",
      "target": "jason-duval",
      "type": "boss",
      "status": "confirmed"
    },
    {
      "source": "boobie-ike",
      "target": "lucia-caminos",
      "type": "boss",
      "status": "confirmed"
    },
    {
      "source": "raul-bautista",
      "target": "jason-duval",
      "type": "crew",
      "status": "confirmed"
    },
    {
      "source": "raul-bautista",
      "target": "lucia-caminos",
      "type": "crew",
      "status": "confirmed"
    },
    {
      "source": "raul-bautista",
      "target": "lucia-caminos",
      "type": "romantic",
      "status": "speculation"
    },
    {
      "source": "raul-bautista",
      "target": "jason-duval",
      "type": "rival",
      "status": "speculation"
    },
    {
      "source": "drequan-priest",
      "target": "jason-duval",
      "type": "associate",
      "status": "confirmed"
    },
    {
      "source": "drequan-priest",
      "target": "lucia-caminos",
      "type": "associate",
      "status": "confirmed"
    }
  ]
};
