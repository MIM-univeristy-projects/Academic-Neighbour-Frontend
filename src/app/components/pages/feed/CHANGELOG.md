# Zmiany w module Feed

## Model Postu

Model został zaktualizowany zgodnie z API backend:

```typescript
interface Post {
  id: number;              // Zmienione z string
  text: string;            // Zmienione z content
  author_id: number;       // Uproszczone z obiektu author
  created_at: string;      // ISO 8601 format, zmienione z Date
}
```

## Angular Material & Tailwind

### Dodane moduły Angular Material:
- `MatCardModule` - karty dla postów
- `MatButtonModule` - przyciski akcji
- `MatIconModule` - ikony Material
- `MatTooltipModule` - podpowiedzi
- `MatFormFieldModule` - pola formularza
- `MatInputModule` - pola tekstowe

### Wykorzystane klasy Tailwind:
- Layout: `flex`, `grid`, `max-w-3xl`, `mx-auto`
- Spacing: `p-4`, `mb-6`, `gap-3`
- Typography: `text-4xl`, `font-bold`, `leading-relaxed`
- Colors: `bg-gray-50`, `text-gray-700`, `from-purple-500`
- Effects: `hover:shadow-lg`, `transition-shadow`, `animate-spin`

## Komponenty

### PostComponent
- Używa `mat-card` z Material Design
- Avatar z gradientem i inicjałami użytkownika (U{author_id})
- Przyciski z ikonami Material (`thumb_up`, `comment`)
- Tooltips na akcjach
- Pełna responsywność dzięki Tailwind

### CreatePostFormComponent
- Material Form Field z `appearance="outline"`
- Dynamiczne rozwijanie textarea (1 → 4 wiersze)
- Licznik znaków z kolorowym wskazaniem (Tailwind)
- Material buttons z ikonami
- Gradient na przycisku submit

### FeedComponent
- Czysty, minimalistyczny layout
- Spinner ładowania z animacją Tailwind
- Empty state z informacją dla użytkownika
- Maksymalna szerokość 3xl dla czytelności

## Kluczowe zmiany w kodzie

1. **Typy** - wszystkie `string` ID zmienione na `number`
2. **Nazwy pól** - `content` → `text`, `createdAt` → `created_at`
3. **Format daty** - `Date` → `string` (ISO 8601)
4. **Stylowanie** - migracja z czystego CSS na Tailwind + Material
5. **Dostępność** - dodane tooltips i ARIA labels

## Testowanie

Wszystkie testy zostały zaktualizowane zgodnie z nowymi modelami danych.
