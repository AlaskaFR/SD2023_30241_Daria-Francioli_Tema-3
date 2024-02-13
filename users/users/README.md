# Documentație
## Serviciu de distribuție digitală de jocuri video
Un serviciu de distribuție digitală de jocuri video este o platformă unde se pot cumpăra, distribui și promova jocuri video.
## Funcționalități
Website-ul va avea 4 nivele de permisiuni pentru utilizatori, în funcție de contul cu care sunt logați. Fiecare nivel mai înalt are toate funcționalitățile nivelelor mai joase de permisiune:
- Nivelul 0, vizitator: aceștia nu au nevoie de cont. Vizitatorii vor putea să vizualizeze jocurile, să le sorteze după popularitate, recenzii, data lansării sau preț, să le filtreze în funcție de interval de preț, reduceri sau taguri. De asemenea vor putea să vizualizeze poze care aprțin acestor jocuri, recenzile altori utlizatori si conturile acestora. Vizitatorii vor avea oricand posibilitatea să se înscrie pe site cu un cont propriu sau să se logheze cu unul existent pentru a avea mai multă libertate pe website. Oricând un vizitator va apăsa pe butoane cum ar fi cele de ”Adaugă în coș”, vor fi redirecționați la pagina unde își pot face cont.
- Nivelul 1, utilizator: aceștia au nevoie de cont. Pe lângă funcționalitățile precizate mai sus, utilizatorii vor avea și o pagină personalizată de descoperire de jocuri. Astfel, în funcție de jocurile deja deținute de utilizator, îi vor fi recomandate jocuri noi cu taguri similare. Utilizatorii vor putea să-și pună porecle, poze de profil, poze de fundal la pagina lor, și să își adauge o descriere la profil. Pe deasupra vor putea ține o evidență a jocurilor jucate și a timpului petrecut pe ele, cum o să fie câte un contor pentru orele jucate în fiecare joc. De asemenea va putea lăsa recenzii cu notă din 10 și un mesaj. Vor putea lăsa comentarii pe paginilor altor utilizatori. Utilizatori vor putea să-și vizualizeze jocurile cumpărate într-un loc, iar când intră pe pagina unui joc deținut vor avea opțiunea să lase o recenzie, să cumpere jocul pentru un alt utilizator, sau să îl downloadeze pentru ei.
- Nivelul 3, developer: aceștia au nevoie de cont și un pas în plus de verificare. Ei au posibilitatea să își încarce jocurile proprii. Vor putea de asemenea să editeze detalii despre jocurile lor, să încarce poze și să adauge discounturi.
- Nivelul 4, administrator: aceștia au voie să șteargă, să modifice și să adauge date din baza de date cu foarte puține constrângeri. Vor putea edita pagini de jocuri, să adauge sau să șteargă jocuri din librariile utilizatorilor și să pună discounturi.

## Baza de date
Eu voi avea în total 9 tabele în baza de date.
- PERMISSION - Tabela pentru permisiunile existente, contine "admin", "dev" sau "user".
- USER - Tabela pentru utilizatori conține detaliile despre ei dar și id-ul nivelului de permisiuni.
- GAME - Are diferite informații despre fiecare joc video, cum ar fi numele, descrierea, prețul sau data de lansare.
- GAME_IMAGES - Fiecare joc poate avea mai multe poze, așa că am făcut o tabela pentru poze din jocuri și jocul sursă.
- TAG - O listă de taguri posibile pentru jocuri.
- GAME_TAGS - Deoarece este o relație Many to Many dintre taguri și jocuri, avem acest tabel pentru a face asocierile necesare.
- REVIEW - Pentru recenzii am făcut tabela care să conțină mesajul, autorul, jocul destinatar și nota dată.
- GAME_OWNERSHIP - Detaliază jocurile deținute de diferiți jucători, precum și numărul de ore jucate de aceștia în cadrul jocurilor.
- DISCOUNT - Tabelă pentru a stoca dicounturi, conține jocul care primește discountul, data până când este valabil și dimensiunea discountului.

## Endpoints
Toate requesturile returnează un obiect de tip DTO, care conține un int pentru status, un mesaj și obiectul care a fost cerut. Pentru interfața cu alte aplicații, acest API dispune de următoarele endpointuri:
- GET /user/login - returnează un User în cazul în care a fost găsit cu emailul/username-ul și parola oferite ca parametrii. Exemplu: localhost:8080/user/login?usernameEmail=asmo_192&password=qwertyui
- POST /user/register - înregistrează userul cu parametrii primiți și returnează True în cazul în care a fost înregistrat userul cu succes, altfel returnează false și codul 400. Exemplu : localhost:8080/user/register?username=dev&email=tores3@gmail.com&password=12345678&repeatPassword=12345678
- PUT /user/edit - editează userul cu ID-ul dat și returnează True în cazul în care a fost editat userul cu succes. Exemplu: localhost:8080/user/edit?id=1&iconURL=staas
