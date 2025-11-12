# Feed Module

Moduł Feed odpowiada za wyświetlanie i zarządzanie tablicą postów w aplikacji Academic Neighbour.

## Struktura

```
feed/
├── feed.ts                    # Główny komponent kontenera
├── feed.html                  # Template głównego komponentu
├── feed.css                   # Style głównego komponentu
├── feed.spec.ts              # Testy głównego komponentu
├── post/                     # Komponent pojedynczego posta
│   ├── post.ts
│   ├── post.html
│   ├── post.css
│   └── post.spec.ts
└── create-post-form/         # Komponent formularza tworzenia posta
    ├── create-post-form.ts
    ├── create-post-form.html
    ├── create-post-form.css
    └── create-post-form.spec.ts
```

## Komponenty

### FeedComponent (`feed.ts`)

Główny komponent kontenera, który zarządza całą tablicą postów.

**Funkcjonalności:**
- Ładowanie listy postów z serwisu
- Wyświetlanie formularza tworzenia nowego posta
- Wyświetlanie listy postów
- Obsługa stanów: ładowanie, pusta lista, lista postów
- Przekazywanie zdarzeń (lajkowanie, komentowanie) do serwisu

**Inputs:** Brak

**Outputs:** Brak

**Metody:**
- `ngOnInit()` - inicjalizacja komponentu i ładowanie postów
- `loadPosts()` - pobieranie listy postów z serwisu
- `onCreatePost(postData: CreatePostDto)` - tworzenie nowego posta
- `onLikePost(postId: string)` - lajkowanie posta
- `onCommentPost(postId: string)` - komentowanie posta (TODO)

### PostComponent (`post/post.ts`)

Reużywalny komponent do wyświetlania pojedynczego posta.

**Funkcjonalności:**
- Wyświetlanie informacji o autorze (avatar, nazwa)
- Wyświetlanie treści posta
- Wyświetlanie daty utworzenia (relatywnej)
- Przyciski akcji: lajkowanie i komentowanie
- Liczniki polubień i komentarzy

**Inputs:**
- `post: Post` (required) - dane posta do wyświetlenia

**Outputs:**
- `likePost: EventEmitter<number>` - emitowane przy kliknięciu przycisku "like"
- `commentPost: EventEmitter<number>` - emitowane przy kliknięciu przycisku "komentarz"

**Metody:**
- `onLike()` - obsługa kliknięcia przycisku "like"
- `onComment()` - obsługa kliknięcia przycisku "komentarz"
- `getFormattedDate(dateString: string): string` - formatowanie daty ISO 8601 na względny czas
- `getAuthorInitial(): string` - generowanie inicjałów dla avatara

### CreatePostFormComponent (`create-post-form/create-post-form.ts`)

Komponent z formularzem do tworzenia nowego posta.

**Funkcjonalności:**
- Pole textarea z walidacją (min 1 znak, max 5000 znaków)
- Dynamiczne rozwijanie formularza po focus
- Licznik znaków z kolorowym wskaźnikiem
- Przyciski: Anuluj i Opublikuj
- Walidacja formularza

**Inputs:** Brak

**Outputs:**
- `createPost: EventEmitter<CreatePostDto>` - emitowane przy wysłaniu formularza

**Właściwości:**
- `postForm: FormGroup` - formularz reaktywny (pole: `text`)
- `isExpanded: boolean` - stan rozwinięcia formularza
- `characterCount: number` - liczba znaków w polu tekstowym
- `characterCountColor: string` - klasa Tailwind dla koloru licznika znaków

**Metody:**
- `onFocus()` - rozwijanie formularza
- `onCancel()` - anulowanie i reset formularza
- `onSubmit()` - wysłanie formularza

## Modele

### Post (`models/post.model.ts`)

Zgodne z API backend:

```typescript
interface Post {
  id: number;
  text: string;
  author_id: number;
  created_at: string; // ISO 8601 format
}
```

### CreatePostDto (`models/post.model.ts`)

```typescript
interface CreatePostDto {
  text: string;
}
```

## Serwis

### PostService (`services/post.service.ts`)

Serwis zarządzający danymi postów.

**Metody:**
- `getPosts(): Observable<Post[]>` - pobieranie wszystkich postów
- `createPost(postData: CreatePostDto): Observable<Post>` - tworzenie nowego posta
- `likePost(postId: number): Observable<Post>` - lajkowanie posta
- `getPost(postId: number): Observable<Post | undefined>` - pobieranie pojedynczego posta
- `deletePost(postId: number): Observable<void>` - usuwanie posta

**Uwaga:** Obecnie serwis używa mock data. W przyszłości należy zastąpić go prawdziwymi wywołaniami HTTP API.

## Użycie

```typescript
// W routes lub standalone component
import { Feed } from './components/pages/feed/feed';

// Dodaj do routes
{
  path: 'feed',
  component: Feed
}
```

## Stylowanie

Komponenty używają:
- **Angular Material** - komponenty UI (Cards, Buttons, Form Fields, Icons)
- **Tailwind CSS** - utility-first CSS framework
- Responsive design
- Gradient backgrounds (purple to indigo)
- Smooth transitions i animacje
- Material Design principles

## Testy

Każdy komponent posiada plik `.spec.ts` z testami jednostkowymi:
- `feed.spec.ts` - testy głównego komponentu
- `post.spec.ts` - testy komponentu posta
- `create-post-form.spec.ts` - testy formularza

Uruchomienie testów:
```bash
npm test
```

## TODO

- [ ] Integracja z prawdziwym API backend
- [ ] Implementacja funkcjonalności komentarzy
- [ ] Edycja i usuwanie postów
- [ ] Paginacja / infinite scroll
- [ ] Załączniki (zdjęcia, pliki)
- [ ] Tagowanie użytkowników
- [ ] Hashtagi
- [ ] Reakcje (różne typy emoji)
- [ ] Powiadomienia
- [ ] Filtrowanie i sortowanie postów
