import React, { useState, useEffect } from "react";
import { 
  Grid, 
  Typography, 
  Box, 
  CircularProgress, 
  Alert, 
  Breadcrumbs,
  Link,
  Divider,
  Avatar,
  Button,
  IconButton
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import './Entertainment.css';

const EntertainmentDetails = ({ theme }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [article, setArticle] = useState(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [showMobileNav, setShowMobileNav] = useState(false);
  
  // Collection of articles keyed by their ID
  const articleCollection = {
    // Avatar 3
    "2": {
      id: "2",
      title: "Avatar 3: New Details Revealed About the 2025 Release",
      image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1000&auto=format&fit=crop",
      publishDate: "March 15, 2024",
      author: "Film Insider",
      authorImage: "https://ui-avatars.com/api/?name=Film+Insider",
      content: `
        <h2>Avatar 3: The Next Chapter in Pandora's Story</h2>
        <p>James Cameron's highly anticipated "Avatar 3" is set to hit theaters on December 19, 2025, promising to expand the world of Pandora in unprecedented ways. The film, which has already completed principal photography, will introduce audiences to new regions and cultures of the alien moon.</p>
        
        <h3>The Fire Na'vi</h3>
        <p>One of the most significant additions to the franchise will be the introduction of the Ash People, a new Na'vi clan associated with fire and volcanic regions. This marks a departure from the forest and water settings of the previous films, showcasing a more aggressive and potentially antagonistic Na'vi culture.</p>
        
        <h3>Cast and Characters</h3>
        <p>Sam Worthington and Zoe Saldana return as Jake Sully and Neytiri, with Sigourney Weaver also returning in a new role. The film introduces several new cast members, including:</p>
        <ul>
          <li>Michelle Yeoh as Dr. Karina Mogue</li>
          <li>Oona Chaplin as Varang</li>
          <li>David Thewlis in an undisclosed role</li>
        </ul>
        
        <h3>Technical Innovations</h3>
        <p>The film continues to push the boundaries of visual effects and motion capture technology. Cameron has developed new underwater motion capture techniques and enhanced the film's visual fidelity beyond what was seen in "The Way of Water."</p>
        
        <h3>Story Development</h3>
        <p>"Avatar 3" will delve deeper into the conflict between humans and Na'vi, while also exploring internal struggles within Na'vi society. The story is said to be darker than its predecessors, with Cameron describing it as "The Godfather" of Pandora.</p>
        
        <h3>Production Scale</h3>
        <p>The film's budget is reported to be around $250 million, with much of that going into:</p>
        <ul>
          <li>Advanced motion capture systems</li>
          <li>Underwater filming technology</li>
          <li>New rendering techniques for the fire and volcanic environments</li>
          <li>Enhanced facial capture systems</li>
        </ul>
        
        <h3>Release Strategy</h3>
        <p>Disney plans a global release strategy, with the film debuting simultaneously in multiple formats including:</p>
        <ul>
          <li>Standard Digital 3D</li>
          <li>IMAX 3D</li>
          <li>High Frame Rate versions</li>
        </ul>
        
        <h3>Franchise Future</h3>
        <p>Cameron has already outlined plans for "Avatar 4" and "Avatar 5," with some portions already filmed. The success of "Avatar 3" will be crucial in determining the franchise's long-term future.</p>
      `,
      category: "Hollywood",
      datePublished: "March 15, 2024",
      tags: ["Avatar", "James Cameron", "Science Fiction", "2025 Films", "3D Movies"]
    },
    // Avengers: Secret Wars
    "1": {
      id: "1",
      title: "Avengers: Secret Wars - Everything We Know About Marvel's Next Epic",
      image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1000&auto=format&fit=crop",
      publishDate: "March 20, 2024",
      author: "Marvel Insider",
      authorImage: "https://ui-avatars.com/api/?name=Marvel+Insider",
      content: `
        <h2>Avengers: Secret Wars - The Ultimate Marvel Crossover</h2>
        <p>Marvel Studios has officially announced that "Avengers: Secret Wars" will be released on May 1, 2025, serving as the culmination of the Multiverse Saga and potentially bringing together heroes from across different universes.</p>
        
        <h3>Story and Source Material</h3>
        <p>Following the events of "Avengers: The Kang Dynasty," Secret Wars is expected to adapt elements from the popular comic storylines of the same name, particularly the 2015 version by Jonathan Hickman which saw the collision of various Marvel universes.</p>
        
        <h3>Kevin Feige's Vision</h3>
        <p>Kevin Feige, president of Marvel Studios, has described the film as "the most ambitious crossover event yet," suggesting that it could feature characters from past Marvel films, including those from before the MCU and potentially from Sony's Spider-Man universe and Fox's X-Men films.</p>
        
        <h3>Cast and Characters</h3>
        <p>Industry insiders report that negotiations are underway to bring back former Marvel stars, with Robert Downey Jr., Chris Evans, and Scarlett Johansson all rumored to be in talks for potential returns, though possibly as variant versions of their characters from different universes.</p>
        
        <h3>The Battleworld Concept</h3>
        <p>The film is expected to center around the concept of "Battleworld," a patchwork planet made up of fragments of different realities created by a powerful entity. In the comics, this was Doctor Doom, though the MCU may adapt this differently given the focus on Kang variants in recent productions.</p>
        
        <h3>Production Timeline</h3>
        <p>Pre-production is scheduled to begin in late 2024, with filming expected to start in early 2025. The movie will be shot back-to-back with "Avengers: The Kang Dynasty" to allow for a cohesive story across both films.</p>
        
        <h3>Multiverse Setup</h3>
        <p>Marvel has been laying the groundwork for Secret Wars through various projects, including:</p>
        <ul>
          <li>Loki</li>
          <li>Doctor Strange in the Multiverse of Madness</li>
          <li>Ant-Man and the Wasp: Quantumania</li>
        </ul>
        <p>All of these have explored the concept of the multiverse and introduced the threat of incursions between universes.</p>
        
        <h3>Technical Challenges</h3>
        <p>"This will be the most technically challenging film we've ever made," said one Marvel executive who requested anonymity. "The visual effects requirements alone are unprecedented."</p>
        
        <h3>Future of the MCU</h3>
        <p>Fans are speculating that Secret Wars could reset aspects of the MCU timeline, potentially allowing for new actors to take on iconic roles and setting up the next decade of Marvel storytelling.</p>
      `,
      category: "Hollywood",
      datePublished: "March 20, 2024",
      tags: ["Avengers", "Marvel", "Secret Wars", "MCU", "2025 Films"]
    },
    // Bollywood Articles
    // Shah Rukh Khan article
    "b1": {
      id: "b1",
      title: "Shah Rukh Khan announces new film project",
      image: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?q=80&w=1000&auto=format&fit=crop",
      publishDate: "March 15, 2024",
      author: "Bollywood Reporter",
      authorImage: "https://ui-avatars.com/api/?name=Bollywood+Reporter",
      content: `
        <p>Superstar Shah Rukh Khan has officially announced his next film project, an action thriller tentatively titled "Black Knight," set to begin production next month. This marks his fourth film announcement since his triumphant return to the big screen in 2023.</p>
        
        <p>The film will be directed by Siddharth Anand, who previously worked with Khan on the blockbuster "Pathaan." According to sources close to the production, "Black Knight" will feature Khan as a former special forces operative who becomes entangled in a global conspiracy.</p>
        
        <p>"This is unlike anything I've done before," Khan stated during the announcement event in Mumbai. "The script immediately grabbed me because it combines the adrenaline rush of action with a deeply emotional core story about redemption and identity."</p>
        
        <p>The film will be shot across multiple international locations including London, Dubai, and Kashmir, with a significant portion of filming taking place at Yash Raj Films' studios in Mumbai. The production budget is reportedly one of the highest ever for an Indian film.</p>
        
        <p>Deepika Padukone is rumored to be in talks to star opposite Khan, which would mark their fourth collaboration following "Om Shanti Om," "Chennai Express," and "Pathaan." However, official confirmation of her involvement is still pending.</p>
        
        <p>The technical team includes cinematographer Satchith Paulose, known for his work on "Vikram" and "Kaithi," and action director Casey O'Neill, who has previously worked on Hollywood productions including "Mission: Impossible" and "Top Gun: Maverick."</p>
        
        <p>"We're pushing the boundaries of what can be achieved in Indian cinema," explained producer Aditya Chopra. "The action sequences planned for this film will set new standards for the industry."</p>
        
        <p>The announcement comes as Khan enjoys a career resurgence following the massive success of "Pathaan," "Jawan," and "Dunki" in 2023, which collectively grossed over ₹3000 crore worldwide. Industry analysts note that Khan's star power remains undiminished despite a brief period of box office challenges prior to 2023.</p>
        
        <p>Music for the film will be composed by Pritam, with lyrics by Irshad Kamil, the duo behind several of Khan's previous hit soundtracks. The first schedule of shooting is set to begin in April 2024, with a targeted release date during the Diwali festival in 2025.</p>
        
        <p>Khan also hinted at potential cameos from other Bollywood stars, saying, "This film has room for some special appearances that I think will surprise and delight audiences. We're in talks with some of my dearest friends in the industry."</p>
      `,
      category: "Bollywood",
      datePublished: "March 15, 2024",
      tags: ["Shah Rukh Khan", "Bollywood", "Action Film", "2025 Films", "Siddharth Anand"]
    },
    // Deepika Padukone article
    "b2": {
      id: "b2",
      title: "Deepika Padukone to star in period drama",
      image: "https://images.unsplash.com/photo-1621873493371-9aaee9d508ae?q=80&w=1000&auto=format&fit=crop",
      publishDate: "March 16, 2024",
      author: "Cinema Correspondent",
      content: `
        <p>Acclaimed actress Deepika Padukone has signed on for a new ambitious historical epic to be directed by celebrated filmmaker Sanjay Leela Bhansali. The project, titled "Razia Sultana," will tell the story of the first and only female Sultan of Delhi who ruled during the 13th century.</p>
        
        <p>This marks Padukone's fourth collaboration with Bhansali, following their successful partnerships in "Goliyon Ki Raasleela Ram-Leela," "Bajirao Mastani," and "Padmaavat." Each of these previous films has been both a critical and commercial success, with Padukone's performances receiving widespread acclaim.</p>
        
        <p>"Portraying Razia Sultana is both an honor and a tremendous responsibility," Padukone said in a statement. "Her story is one of courage, vision, and defiance of societal norms that resonates even today. I'm thrilled to bring her journey to life under Sanjay sir's direction."</p>
        
        <p>Bhansali, known for his opulent visual style and meticulous attention to historical detail, has reportedly been researching this project for over three years. The film promises to explore Razia Sultana's rise to power, her progressive governance, and the challenges she faced as a woman ruler in a patriarchal society.</p>
        
        <p>"This is a story that has fascinated me for years," Bhansali commented. "Razia Sultana was a visionary leader whose reign challenged gender norms centuries before such conversations entered the mainstream. Deepika has the perfect combination of regal presence and emotional depth to portray this complex character."</p>
        
        <p>The film's production design will be handled by Bhansali's longtime collaborator Subrata Chakraborty, with costume design by Rimple and Harpreet Narula, who previously worked on "Padmaavat." The music, as with all Bhansali films, will be composed by the director himself.</p>
        
        <p>Pre-production has already begun, with extensive set construction underway at Film City in Mumbai. Historical consultants from Delhi University's History Department are working with the production team to ensure historical accuracy while adapting the story for cinematic presentation.</p>
        
        <p>The male lead to star opposite Padukone has not yet been announced, though industry insiders suggest several top actors are being considered for the role of Altunia, a governor who was romantically linked to Razia Sultana.</p>
        
        <p>Filming is scheduled to begin in September 2024 after Padukone completes her current projects, including Nag Ashwin's sci-fi film "Kalki 2898 AD" and her Hollywood debut. The historical epic has a planned release date in December 2025.</p>
        
        <p>"This will be my most challenging role yet," Padukone added. "I'm dedicating the next several months to intense preparation, including studying historical texts, learning Urdu, and training in various martial arts that Razia was known to have mastered."</p>
      `,
      category: "Bollywood",
      datePublished: "March 16, 2024",
      tags: ["Deepika Padukone", "Sanjay Leela Bhansali", "Period Drama", "Bollywood", "Historical Film"]
    },
    // Ranbir Kapoor and Alia Bhatt article
    "b3": {
      id: "b3",
      title: "Ranbir Kapoor and Alia Bhatt's next film together announced",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop",
      publishDate: "March 17, 2024",
      author: "Entertainment Journalist",
      content: `
        <p>Power couple Ranbir Kapoor and Alia Bhatt will appear together in a new romantic drama titled "Safar" (Journey), scheduled for release next year. The announcement comes after the success of their first film together, "Brahmastra: Part One - Shiva," which became one of the highest-grossing Indian films of 2022.</p>
        
        <p>Acclaimed director Shakun Batra, known for "Gehraiyaan" and "Kapoor & Sons," will helm the project. The film is described as a contemporary love story that follows a couple through different phases of their relationship over a decade, exploring themes of growth, connection, and the evolution of love.</p>
        
        <p>"Working with Ranbir and Alia together is a dream come true," Batra stated. "Their chemistry is undeniable, and the emotional depth they both bring to their performances will elevate this story beyond a typical romance."</p>
        
        <p>Kapoor and Bhatt, who married in April 2022 and welcomed their daughter Raha later that year, have been selective about their projects since becoming parents. "Safar" represents their return to the screen as a couple, which has generated significant excitement among fans and industry insiders alike.</p>
        
        <p>"The script resonated with us on a personal level," Bhatt explained during the announcement press conference. "It captures the beautiful complexity of relationships and how they transform over time. It's a mature, nuanced take on modern love."</p>
        
        <p>Kapoor added, "What attracted me to this project is how it portrays love not just as a feeling but as a choice you make every day. The character arc is challenging and unlike any romantic role I've played before."</p>
        
        <p>The supporting cast includes veteran actors Ratna Pathak Shah and Naseeruddin Shah, who will play pivotal roles as family members whose own relationship parallels and contrasts with the central love story. Rising star Triptii Dimri has also been cast in a significant role.</p>
        
        <p>Music for the film will be composed by Pritam, with lyrics by Amitabh Bhattacharya. The duo has previously created memorable soundtracks for both Kapoor and Bhatt's films, including "Ae Dil Hai Mushkil" and "Highway" respectively.</p>
        
        <p>The film will be shot in various locations across India, including Mumbai, Delhi, and Shimla, with an international schedule planned in Italy. Production is set to begin in August 2024, after both actors complete their current commitments.</p>
        
        <p>Karan Johar's Dharma Productions will produce "Safar" in collaboration with Batra's Jouska Films. Johar expressed enthusiasm about the project, saying, "This is the kind of mature, heartfelt storytelling that Indian cinema needs more of. With Ranbir and Alia bringing these characters to life under Shakun's direction, we're confident this film will resonate deeply with audiences."</p>
      `,
      category: "Bollywood",
      datePublished: "March 17, 2024",
      tags: ["Ranbir Kapoor", "Alia Bhatt", "Romantic Drama", "Bollywood", "Shakun Batra"]
    },
    // Karan Johar article
    "b4": {
      id: "b4",
      title: "Karan Johar announces directorial comeback",
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1000&auto=format&fit=crop",
      publishDate: "March 14, 2024",
      author: "Film Industry Analyst",
      content: `
        <p>Celebrated filmmaker Karan Johar has announced his return to directing with a multi-starrer family drama tentatively titled "Parivar" (Family). This marks Johar's seventh directorial venture and his first since "Rocky Aur Rani Kii Prem Kahaani," which was released in 2023 to critical and commercial acclaim.</p>
        
        <p>The film boasts an ensemble cast featuring some of Bollywood's biggest stars, including Ranveer Singh, Kareena Kapoor Khan, Vicky Kaushal, and Janhvi Kapoor. Veteran actors Shabana Azmi and Dharmendra have also been confirmed in pivotal roles, continuing their collaboration with Johar following "Rocky Aur Rani Kii Prem Kahaani."</p>
        
        <p>"Storytelling is my passion, and I've always been drawn to family dynamics," Johar stated during the announcement. "With 'Parivar,' I'm exploring the complexities of modern Indian families while honoring our traditional values. It's a narrative that's deeply personal yet universally relatable."</p>
        
        <p>The film is described as a contemporary take on joint family systems, addressing themes of intergenerational relationships, evolving social norms, and the balance between individual aspirations and family responsibilities. The narrative reportedly spans three generations and includes both dramatic and comedic elements.</p>
        
        <p>Production designer Amrita Mahal, who previously collaborated with Johar on "Rocky Aur Rani Kii Prem Kahaani," is creating elaborate sets for the family home where much of the story takes place. The film will also feature sequences shot in Delhi, London, and Switzerland, locations that have become somewhat signature settings in Johar's filmography.</p>
        
        <p>"Karan has crafted a script that feels both fresh and familiar," said Ranveer Singh, who plays one of the central characters. "It captures the essence of what makes his films so special—the emotional depth, the grandeur, the music—while pushing into new territory thematically."</p>
        
        <p>Music for the film will be composed by Pritam, while Johar's frequent collaborator Manish Malhotra will design the costumes. The cinematography will be handled by Jayesh Pradhan, who recently worked on "Animal" and "Brahmastra."</p>
        
        <p>Johar's Dharma Productions will produce the film, with a substantial budget allocated for the large-scale production. The filmmaker mentioned that while the story is emotionally grounded, the visual presentation will have the trademark Dharma grandeur that audiences have come to expect.</p>
        
        <p>"After focusing on producing and mentoring new directors for several years, it feels invigorating to return to hands-on directing," Johar added. "The energy on set when you're bringing your own vision to life is incomparable."</p>
        
        <p>Filming is scheduled to begin in October 2024, with a targeted release during the Diwali festival in 2025. Industry analysts are already predicting that the combination of Johar's directorial sensibilities and the star-studded cast will make "Parivar" one of the most anticipated releases of 2025.</p>
      `,
      category: "Bollywood",
      datePublished: "March 14, 2024",
      tags: ["Karan Johar", "Dharma Productions", "Family Drama", "Bollywood", "Ensemble Cast"]
    },
    // House of the Dragon Season 3
    "3": {
      id: "3",
      title: "House of the Dragon Season 3 Begins Production for 2025 Release",
      image: "https://images.unsplash.com/photo-1558507334-57300f59f0bd?q=80&w=1000&auto=format&fit=crop",
      publishDate: "March 15, 2024",
      author: "TV Reporter",
      authorImage: "https://ui-avatars.com/api/?name=TV+Reporter",
      content: `
        <h2>House of the Dragon Season 3: The Next Chapter in Westeros</h2>
        <p>HBO has confirmed that production on the third season of "House of the Dragon" has officially begun, with a target release date set for Summer 2025. The hit Game of Thrones prequel series will continue to explore the Targaryen civil war known as the "Dance of the Dragons."</p>
        
        <h3>Showrunner's Vision</h3>
        <p>Showrunner Ryan Condal revealed that Season 3 will cover some of the most dramatic events from George R.R. Martin's "Fire & Blood," including major battles involving dragons that will push the boundaries of television visual effects.</p>
        
        <h3>Technical Innovation</h3>
        <p>"What we're attempting in Season 3 has never been done on television before," Condal stated in a press release. "The scale of the dragon battles alone requires technology that didn't exist even a few years ago."</p>
        
        <h3>Cast and Characters</h3>
        <p>The principal cast is returning, including:</p>
        <ul>
          <li>Emma D'Arcy as Rhaenyra Targaryen</li>
          <li>Olivia Cooke as Alicent Hightower</li>
        </ul>
        <p>New additions to the cast include several high-profile actors whose roles remain under wraps, but insiders suggest they will play key historical figures from Martin's lore.</p>
        
        <h3>Production Scale</h3>
        <p>HBO has committed to an expanded budget for the season, reportedly exceeding $20 million per episode, making it one of the most expensive television productions in history. Much of this budget will go toward the extensive CGI required for the multiple dragon battle sequences.</p>
        
        <h3>Filming Locations</h3>
        <p>Filming will take place across locations in the UK, Spain, and Portugal, with new sets being constructed to represent locations in Westeros that haven't been seen before in either Game of Thrones or previous seasons of House of the Dragon.</p>
        
        <h3>Author's Involvement</h3>
        <p>George R.R. Martin is heavily involved in the development of the season, working closely with the writing team to ensure the adaptation remains faithful to his vision while expanding certain storylines for television.</p>
        
        <h3>Episode Structure</h3>
        <p>The season will consist of 10 episodes, with each expected to run longer than the typical hour runtime of previous seasons. HBO executives have indicated that some episodes may approach feature length.</p>
        
        <h3>Story Development</h3>
        <p>"We're entering the heart of this story now," said Martin in a statement. "The events that unfold in Season 3 will forever change the landscape of Westeros and the Targaryen dynasty."</p>
        
        <h3>Marketing and Release</h3>
        <p>The first teaser for Season 3 is expected to be released in early 2025, with a full trailer coming approximately two months before the premiere.</p>
      `,
      category: "Television",
      datePublished: "March 15, 2024",
      tags: ["House of the Dragon", "Game of Thrones", "HBO", "2025 Series", "Fantasy"]
    },
    // Mission: Impossible 8
    "4": {
      id: "4",
      title: "Mission: Impossible 8 - Tom Cruise's Final Mission",
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop",
      publishDate: "March 17, 2024",
      author: "Action Movie Insider",
      authorImage: "https://ui-avatars.com/api/?name=Action+Movie+Insider",
      content: `
        <h2>Mission: Impossible 8 - The Epic Conclusion</h2>
        <p>Paramount Pictures has confirmed that "Mission: Impossible 8" will mark Tom Cruise's final appearance as IMF agent Ethan Hunt, bringing the long-running action franchise to a climactic conclusion when it releases on June 27, 2025.</p>
        
        <h3>The End of an Era</h3>
        <p>After nearly three decades and eight films, the Mission: Impossible saga will conclude with what director Christopher McQuarrie describes as "the most ambitious and explosive entry in the series." The film will directly follow the events of "Mission: Impossible - Dead Reckoning Part One," resolving the cliffhangers and completing story arcs that have been building for several films.</p>
        
        <h3>Cast and Characters</h3>
        <p>Returning alongside Cruise are franchise veterans:</p>
        <ul>
          <li>Simon Pegg as Benji Dunn</li>
          <li>Ving Rhames as Luther Stickell</li>
          <li>Rebecca Ferguson as Ilsa Faust</li>
          <li>Vanessa Kirby as Alanna Mitsopolis/White Widow</li>
        </ul>
        <p>Hayley Atwell will return from "Dead Reckoning Part One," while Esai Morales continues as the primary antagonist. Several surprise appearances from past films are rumored but unconfirmed.</p>
        
        <h3>Extreme Stunts</h3>
        <p>"Tom has been training for over two years for the final sequence alone," revealed McQuarrie in a recent interview. "What he's attempting goes beyond anything seen in the previous films—including the HALO jump, the cliff hanging, or the helicopter chase. This will be the benchmark against which future action sequences are measured."</p>
        
        <h3>Global Production</h3>
        <p>Filming has taken place across multiple continents, with major sequences shot in:</p>
        <ul>
          <li>Norway's dramatic fjords</li>
          <li>Abu Dhabi's deserts</li>
          <li>London's urban landscape</li>
          <li>A specially constructed set in the Mojave Desert</li>
        </ul>
        <p>The production budget has reportedly exceeded $300 million, making it one of the most expensive films ever produced.</p>
        
        <h3>Technical Innovation</h3>
        <p>Continuing the franchise's commitment to practical effects, the film employs minimal CGI for its action sequences. New camera technology has been developed specifically for several sequences, including custom IMAX cameras for what's described as a "revolutionary" aerial sequence.</p>
        
        <h3>Franchise Legacy</h3>
        <p>"We wanted to honor what's come before while delivering something entirely new," said producer Jake Myers. "This isn't just the end of Ethan Hunt's story, it's a celebration of what Mission: Impossible has meant to action cinema since 1996."</p>
        
        <h3>Release Strategy</h3>
        <p>The film will have an exclusive IMAX and premium format release for two weeks before expanding to standard theaters. Paramount is reportedly planning one of the largest marketing campaigns in the studio's history, culminating in a global premiere tour with events in seven cities across different continents.</p>
        
        <p>While this marks the end of Cruise's tenure as Ethan Hunt, studio executives have not ruled out future installments or spinoffs focusing on other characters in the IMF universe.</p>
      `,
      category: "Hollywood",
      datePublished: "March 17, 2024",
      tags: ["Mission Impossible", "Tom Cruise", "Action", "2025 Films", "Paramount"]
    },
    // The Last of Us Season 2
    "5": {
      id: "5",
      title: "The Last of Us Season 2: What to Expect in the HBO Hit's Return",
      image: "https://images.unsplash.com/photo-1605806616949-59450989e6f7?q=80&w=1000&auto=format&fit=crop",
      publishDate: "March 16, 2024",
      author: "TV Trends Reporter",
      authorImage: "https://ui-avatars.com/api/?name=TV+Trends+Reporter",
      content: `
        <h2>The Last of Us Season 2: Continuing the Journey</h2>
        <p>HBO has announced that "The Last of Us" Season 2 is officially in production and on track for a February 2025 release. Following the critically acclaimed first season, which was praised for its faithful adaptation of the beloved video game, the new season will tackle the events of "The Last of Us Part II."</p>
        
        <h3>Story Direction</h3>
        <p>Showrunners Craig Mazin and Neil Druckmann have confirmed that Season 2 will begin adapting the events of the second game, which takes place five years after the original. However, they have indicated that the story of the second game will likely span more than one season.</p>
        
        <p>"The second game is much larger than the first," explained Druckmann, who also created the original games. "There's no way we could tell that story in just nine episodes. We're taking our time to ensure we do it justice."</p>
        
        <h3>Cast Returns and Additions</h3>
        <p>Pedro Pascal and Bella Ramsey will return as Joel and Ellie, the central characters from Season 1. Joining them in significant roles are:</p>
        <ul>
          <li>Kaitlyn Dever as Abby, a crucial new character</li>
          <li>Isabela Merced as Dina, Ellie's romantic interest</li>
          <li>Young Mazino as Jesse, a member of Jackson's patrol teams</li>
          <li>Gabriel Luna returning as Tommy, Joel's brother</li>
          <li>Rutina Wesley as Maria, Tommy's wife and Jackson's leader</li>
        </ul>
        
        <h3>Production Challenges</h3>
        <p>Filming is taking place primarily in Western Canada, with additional sequences shot in Seattle and Wyoming. The production team has constructed several elaborate sets, including a full-scale recreation of the Jackson community and multiple Seattle locations.</p>
        
        <p>"The scale of this season is significantly larger," said executive producer Carolyn Strauss. "We're essentially creating multiple post-apocalyptic environments, each with its own distinct look and challenges."</p>
        
        <h3>Adaptation Approach</h3>
        <p>While Season 1 was praised for its faithful adaptation of the source material, Mazin and Druckmann have hinted at more divergences in Season 2.</p>
        
        <p>"We're following the emotional core of the story while taking some new paths to get there," Mazin explained. "Fans of the game will recognize the major beats, but there will be surprises even for those who know the game inside and out."</p>
        
        <h3>Technical Enhancements</h3>
        <p>The new season features enhanced practical effects for the infected creatures, with prosthetics designer Barrie Gower (known for "Game of Thrones" and "Stranger Things") expanding on the designs established in the first season. New infected types from the second game will make appearances, requiring advanced animatronics and visual effects.</p>
        
        <h3>Musical Score</h3>
        <p>Composers Gustavo Santaolalla and David Fleming are returning to score the second season. Santaolalla, who also composed the music for the games, is introducing new themes while evolving the established motifs from Season 1.</p>
        
        <h3>Critical Expectations</h3>
        <p>Following the massive success of the first season, which won multiple Emmy Awards and achieved both critical acclaim and strong viewership, expectations for Season 2 are extremely high. HBO reported that the Season 1 finale drew 8.2 million viewers, making it one of the network's most successful new shows since "Game of Thrones."</p>
        
        <p>Industry analysts predict that the second season could potentially surpass these numbers, particularly given the dramatic and controversial nature of the second game's storyline.</p>
      `,
      category: "Television",
      datePublished: "March 16, 2024",
      tags: ["The Last of Us", "HBO", "Pedro Pascal", "Bella Ramsey", "2025 Series", "Video Game Adaptation"]
    },
    // Joker: Folie à Deux
    "6": {
      id: "6",
      title: "Joker: Folie à Deux - First Reactions Praise 'Revolutionary' Musical Approach",
      image: "https://images.unsplash.com/photo-1590179068383-b9c69aacebd3?q=80&w=1000&auto=format&fit=crop",
      publishDate: "March 18, 2024",
      author: "Film Critic",
      content: `
        <p>Early industry screenings of "Joker: Folie à Deux" have generated significant buzz, with initial reactions praising director Todd Phillips' bold decision to incorporate musical elements into the highly anticipated sequel scheduled for release on October 4, 2025.</p>
        
        <p>The film, which sees Joaquin Phoenix reprising his Oscar-winning role as Arthur Fleck/Joker, introduces Lady Gaga as Harley Quinn in what is being described as "a tragic love story told through the lens of psychosis and punctuated by haunting musical sequences."</p>
        
        <p>"What Phillips has created is nothing short of revolutionary for the genre," said one industry insider who attended a private screening. "It's a psychological thriller first and foremost, but the musical elements elevate the narrative in ways that are both disturbing and mesmerizing."</p>
        
        <p>The sequel reportedly takes place largely within Arkham Asylum, where Arthur Fleck has been institutionalized following the events of the first film. The musical sequences are said to represent Fleck's increasingly fractured psyche as he forms a complicated relationship with another inmate, played by Gaga.</p>
        
        <p>Phoenix underwent extensive vocal training for the role, while Gaga has reportedly delivered what early viewers are calling "an Oscar-worthy performance" that balances vulnerability with menace. Their on-screen chemistry is described as "electric and unpredictable."</p>
        
        <p>The film's musical approach has been compared to classics like "Cabaret" and "Chicago" rather than traditional musicals, with dark, unsettling numbers that serve to deepen the psychological aspects of the story rather than lighten them. The score and original songs were created by Hildur Guðnadóttir, who won an Academy Award for her work on the first film.</p>
        
        <p>Warner Bros. has been carefully managing expectations for the film, which represents a significant departure from both the first "Joker" and traditional comic book adaptations. Early test screenings reportedly polarized audiences, with some calling it "a masterpiece" while others found the musical approach jarring.</p>
        
        <p>"This isn't a film designed to please everyone," admitted one Warner Bros. executive speaking on condition of anonymity. "It's a bold artistic statement that will likely be debated for years to come."</p>
        
        <p>The supporting cast includes returning actors Zazie Beetz and Brett Cullen, along with new additions Catherine Keener and Brendan Gleeson in undisclosed roles rumored to be significant to the asylum setting.</p>
        
        <p>The first official trailer is scheduled to be released in late 2024, with Warner Bros. planning an extensive marketing campaign that will emphasize the film's unique approach while connecting it to the critically acclaimed original.</p>
      `,
      category: "Hollywood",
      datePublished: "March 18, 2024",
      tags: ["Joker", "Joaquin Phoenix", "Lady Gaga", "Musical", "2025 Films"]
    },
    // Black Panther 3
    "7": {
      id: "7",
      title: "Black Panther 3 Set to Explore the Legacy of Wakanda in November 2025",
      image: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=1000&auto=format&fit=crop",
      publishDate: "March 19, 2024",
      author: "Marvel Reporter",
      content: `
        <p>Marvel Studios has officially announced that "Black Panther 3" will hit theaters in November 2025, with Ryan Coogler returning to direct and co-write the third installment in the acclaimed franchise. The film will continue to explore the legacy of Wakanda while introducing new threats and allies to the technologically advanced nation.</p>
        
        <p>Following the emotional journey of "Black Panther: Wakanda Forever," which addressed the passing of Chadwick Boseman and saw Letitia Wright's Shuri step into the role of Black Panther, the third film will explore the challenges of maintaining Wakanda's new openness to the world while protecting its sovereignty and resources.</p>
        
        <p>"We're building on the foundation of the first two films while taking the story in directions that will surprise audiences," Coogler stated in the official announcement. "The world of Wakanda is rich with possibilities, and we're excited to explore new corners of this universe."</p>
        
        <p>Marvel Studios president Kevin Feige confirmed that the film will introduce significant new characters from Marvel Comics' Black Panther lore, with casting already underway for what insiders describe as "one of the most compelling villains in the MCU to date."</p>
        
        <p>Letitia Wright will return as Shuri/Black Panther, alongside Lupita Nyong'o as Nakia, Danai Gurira as Okoye, Winston Duke as M'Baku, and Dominique Thorne as Riri Williams/Ironheart. The film will also feature several surprise appearances from other MCU characters, connecting Wakanda more deeply to the broader universe following its increased prominence in global affairs.</p>
        
        <p>Pre-production is set to begin in late 2024, with principal photography scheduled for early 2025. The production will return to Atlanta's Tyler Perry Studios for stage work, with location shooting planned for several countries in Africa to showcase more of the continent's diverse landscapes and cultures.</p>
        
        <p>Ludwig Göransson, who won Academy Awards for his scores for both previous Black Panther films, is confirmed to return to compose the music. The filmmaker has expressed his intention to incorporate even more authentic African musical traditions into the score while continuing to blend them with orchestral and modern elements.</p>
        
        <p>"The cultural impact of the Black Panther franchise has been profound," noted one Disney executive. "This third film aims to push boundaries even further, both in terms of representation and storytelling."</p>
        
        <p>The film will reportedly explore the ancient history of Wakanda more deeply, with flashback sequences revealing previously unknown aspects of the nation's development and early encounters with the outside world. These historical elements will directly connect to the present-day threat facing the kingdom.</p>
        
        <p>"Black Panther 3" is positioned as a major component of Phase Six of the Marvel Cinematic Universe, with events in the film expected to have significant implications for the broader MCU narrative leading into future Avengers films.</p>
      `,
      category: "Hollywood",
      datePublished: "March 19, 2024",
      tags: ["Black Panther", "Marvel", "Wakanda", "MCU", "2025 Films"]
    },
    // Andor Season 2
    "8": {
      id: "8",
      title: "Andor Season 2: The Final Chapter of the Star Wars Prequel Series Arrives January 2025",
      image: "https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?q=80&w=1000&auto=format&fit=crop",
      publishDate: "March 22, 2024",
      author: "Star Wars Correspondent",
      content: `
        <p>Disney+ has confirmed that the second and final season of the critically acclaimed Star Wars series "Andor" will premiere in January 2025, completing the story that leads directly into the events of "Rogue One: A Star Wars Story."</p>
        
        <p>The 12-episode season will span four years in the life of Cassian Andor (Diego Luna), showing his transformation from a reluctant rebel to the dedicated operative seen in Rogue One. Creator Tony Gilroy has structured the season with each three-episode arc covering a different year in the formation of the Rebel Alliance.</p>
        
        <p>"This season is about watching the revolution come together and seeing all these disparate resistance groups coalesce into what will become the Alliance we know from the original trilogy," Gilroy explained. "It's also about Cassian finding his purpose and becoming the man who's willing to sacrifice everything for the cause."</p>
        
        <p>Diego Luna, who also serves as an executive producer, has described the final season as "the most challenging and rewarding work of my career." He noted that the physical demands of the role increased significantly as the story approaches the events of Rogue One.</p>
        
        <p>The season will see the return of key characters from Season 1, including Stellan Skarsgård as Luthen Rael, Genevieve O'Reilly as Mon Mothma, and Kyle Soller as Syril Karn. New additions to the cast include actors playing familiar characters from the broader Star Wars universe, though specific details remain under tight wraps.</p>
        
        <p>Production wrapped in February 2024 after an extended filming schedule in the UK, with additional location work in several European countries. The complex production faced several delays due to the extensive practical sets and effects used to maintain the gritty, realistic aesthetic established in the first season.</p>
        
        <p>"We're not compromising on the visual quality or the scope of the storytelling," said Kathleen Kennedy, president of Lucasfilm. "Andor has set a new standard for Star Wars on television, and we're committed to maintaining that through the conclusion of this important story."</p>
        
        <p>The season will continue the show's exploration of the moral complexities of rebellion and the personal costs of fighting against tyranny. Early footage shown to Disney executives reportedly includes several major action sequences that rival those seen in Star Wars theatrical releases.</p>
        
        <p>Nicholas Britell returns to compose the score, building on his Emmy-nominated work from the first season. The composer has indicated that the music will evolve to reflect the growing momentum of the rebellion and Cassian's personal journey.</p>
        
        <p>Disney+ plans to release the first three episodes simultaneously in January 2025, with subsequent episodes arriving weekly until the series finale in late March, which insiders describe as "a perfect handoff to Rogue One that will give new meaning to the events of that film."</p>
      `,
      category: "Television",
      datePublished: "March 22, 2024",
      tags: ["Andor", "Star Wars", "Disney+", "2025 Series", "Diego Luna"]
    },
    // Default article for any other IDs
    "default": {
      id: id,
      title: `Upcoming Release Details: Coming Soon`,
      image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop",
      publishDate: "March 2024",
      author: "Entertainment Reporter",
      authorImage: "https://ui-avatars.com/api/?name=Entertainment+Reporter",
      content: `
        <h2>More Details Coming Soon</h2>
        <p>We're gathering more information about this upcoming release. Check back soon for detailed coverage!</p>
        
        <h3>What We Know So Far</h3>
        <p>The entertainment landscape of 2025 is shaping up to be one of the most exciting in recent years, with major franchises reaching new milestones and streaming platforms investing heavily in original content.</p>
        
        <h3>Stay Tuned</h3>
        <p>Stay tuned to News Genius for all the latest updates on this and other entertainment releases coming in 2025.</p>
      `,
      category: "Entertainment",
      datePublished: "March 2024",
      tags: ["2025 Releases", "Entertainment", "Coming Soon"]
    }
  };
  
  useEffect(() => {
    // Simulate API delay
    const fetchArticleData = async () => {
      try {
        setLoading(true);
        
        // Get article data based on ID
        const articleData = articleCollection[id];
        
        if (!articleData) {
          throw new Error("Article not found");
        }
        
        setArticle(articleData);
        
        // Find related articles (in a real app, this would be more sophisticated)
        const related = Object.values(articleCollection)
          .filter(a => a.id !== id && a.category === articleData.category)
          .slice(0, 3);
        
        setRelatedArticles(related);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching article:", error);
        setError(error.message || "Failed to load article");
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [id]);

  const toggleLike = () => {
    setLiked(!liked);
    // In a real app, this would make an API call to update the like status
  };

  const toggleSave = () => {
    setSaved(!saved);
    // In a real app, this would make an API call to update the saved status
  };

  const handleShare = () => {
    // In a real app, you'd implement sharing functionality
    alert("Sharing functionality would be implemented here");
  };

  const RelatedArticleCard = ({ article }) => (
    <Box 
      sx={{ 
        display: 'flex', 
        mb: 2,
        cursor: 'pointer',
        '&:hover': {
          opacity: 0.8
        }
      }}
      onClick={() => navigate(`/entertainment/details/${article.id}`)}
    >
      <img 
        src={article.image} 
        alt={article.title} 
        style={{ width: '100px', height: '70px', objectFit: 'cover', borderRadius: '4px' }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop";
        }}
      />
      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2" fontWeight="bold">
          {article.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {article.category}
        </Typography>
      </Box>
    </Box>
  );

  if (loading) {
    return (
      <Grid container>
        <Grid item xs={12} lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
          <Navigation activePage="entertainment" theme={theme} />
        </Grid>
        <Grid item xs={12} lg={9} className="w-full relative px-2 sm:px-4 md:px-5">
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <CircularProgress />
            <Typography variant="h6" sx={{ ml: 2 }}>Loading article...</Typography>
          </Box>
        </Grid>
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container>
        <Grid item xs={12} lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
          <Navigation activePage="entertainment" theme={theme} />
        </Grid>
        <Grid item xs={12} lg={9} className="w-full relative px-2 sm:px-4 md:px-5">
          <Alert severity="error" sx={{ mt: 4 }}>
            {error}
            <Button onClick={() => navigate('/entertainment')} sx={{ ml: 2 }}>
              Back to Entertainment
            </Button>
          </Alert>
        </Grid>
      </Grid>
    );
  }

  if (!article) {
    return (
      <Grid container>
        <Grid item xs={12} lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
          <Navigation activePage="entertainment" theme={theme} />
        </Grid>
        <Grid item xs={12} lg={9} className="w-full relative px-2 sm:px-4 md:px-5">
          <Alert severity="warning" sx={{ mt: 4 }}>
            Article not found
            <Button onClick={() => navigate('/entertainment')} sx={{ ml: 2 }}>
              Back to Entertainment
            </Button>
          </Alert>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container>
      {/* Mobile Navigation Header */}
      <Box
        sx={{
          display: { xs: 'flex', lg: 'none' },
          position: 'sticky',
          top: 0,
          zIndex: 100,
          width: '100%',
          bgcolor: 'background.paper',
          boxShadow: 1,
          p: 1,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <IconButton onClick={() => navigate('/entertainment')}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">Article Details</Typography>
        <IconButton onClick={() => setShowMobileNav(!showMobileNav)}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Mobile Navigation */}
      {showMobileNav && (
        <Box sx={{ display: { xs: 'block', lg: 'none' }, width: '100%' }}>
          <Navigation activePage="entertainment" theme={theme} />
        </Box>
      )}

      {/* Desktop Navigation */}
      <Grid item xs={12} lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
        <Navigation activePage="entertainment" theme={theme} />
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} lg={6} className="w-full relative px-2 sm:px-4 md:px-5">
        <Box sx={{ mt: 4 }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/entertainment')}
            sx={{ mb: 2 }}
          >
            Back to Entertainment
          </Button>
          
          <Typography variant="h4" gutterBottom>
            {article.title}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              By {article.author} | {article.publishDate}
            </Typography>
            
            <Box>
              <IconButton onClick={toggleLike} size="small">
                {liked ? <ThumbUpIcon color="primary" /> : <ThumbUpOutlinedIcon />}
              </IconButton>
              <IconButton onClick={toggleSave} size="small">
                {saved ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
              </IconButton>
              <IconButton size="small" onClick={handleShare}>
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>
          
          <Box 
            component="img" 
            src={article.image}
            alt={article.title}
            sx={{ 
              width: '100%', 
              height: { xs: 200, sm: 300, md: 400 }, 
              objectFit: 'cover',
              borderRadius: 1,
              mb: 3 
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop";
            }}
          />
          
          <Box 
            dangerouslySetInnerHTML={{ __html: article.content }} 
            sx={{ 
              '& p': { 
                mb: 2, 
                lineHeight: 1.7 
              },
              '& h2': {
                fontSize: '1.75rem',
                fontWeight: 'bold',
                mb: 2,
                mt: 4
              },
              '& h3': {
                fontSize: '1.5rem',
                fontWeight: 'bold',
                mb: 2,
                mt: 3
              },
              '& ul, & ol': {
                pl: 4,
                mb: 2
              },
              '& li': {
                mb: 1
              }
            }}
          />
          
          <Box sx={{ mt: 4, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Tags:</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {article.tags.map((tag, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    bgcolor: 'action.hover', 
                    px: 1.5, 
                    py: 0.5, 
                    borderRadius: 1,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'action.selected'
                    }
                  }}
                  onClick={() => navigate(`/entertainment/tag/${tag}`)}
                >
                  {tag}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Grid>
      
      {/* Related Articles */}
      <Grid item xs={12} lg={3} sx={{ 
        mt: { xs: 4, lg: 4 },
        pl: { xs: 2, lg: 2 },
        pr: { xs: 2, lg: 0 }
      }}>
        <Typography variant="h6" gutterBottom>Related Articles</Typography>
        {relatedArticles.map((related) => (
          <Box 
            key={related.id}
            sx={{ 
              mb: 2,
              cursor: 'pointer',
              '&:hover': {
                '& .title': {
                  color: 'primary.main'
                }
              }
            }}
            onClick={() => navigate(`/entertainment/details/${related.id}`)}
          >
            <Box 
              component="img"
              src={related.image}
              alt={related.title}
              sx={{ 
                width: '100%',
                height: 120,
                objectFit: 'cover',
                borderRadius: 1,
                mb: 1
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop";
              }}
            />
            <Typography 
              variant="subtitle2" 
              className="title"
              sx={{ 
                fontWeight: 'bold',
                transition: 'color 0.2s'
              }}
            >
              {related.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {related.publishDate}
            </Typography>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
};

export default EntertainmentDetails; 