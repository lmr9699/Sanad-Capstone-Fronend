# SANAD Design System

## Brand Keywords
<!-- How should your app FEEL? -->
- Calm
- Soft
- Minimal
- Mobile-first
- Natural

---

## Color Palette

### Primary Colors
| Name | Hex | Usage |
|------|-----|-------|
| Background | `#FAF9F6` | Screen backgrounds (off-white) |
| Background Card | `#FFFFFF` | Card backgrounds |
| Background Secondary | `#EDE7DB` | Secondary surfaces (beige) |
| Primary | `#7FB77E` | Buttons, links, accents (sage green) |
| Primary Light | `#A8D4A7` | Light primary variants |
| Primary Muted | `#6A9E69` | Muted primary variants |
| Text | `#2F2F2F` | Primary text, headings |
| Text Secondary | `#4A4A4A` | Secondary text |
| Text Muted | `#6B6B6B` | Captions, placeholders |
| Text Light | `#8A8A8A` | Light text |

### Secondary Colors
| Name | Hex | Usage |
|------|-----|-------|
| Secondary | `#5F8F8B` | Complementary accents (teal) |
| Secondary Light | `#8FBAB7` | Light secondary variants |

### Semantic Colors
| Name | Hex | Usage |
|------|-----|-------|
| Success | `#7FB77E` | Success states |
| Error | `#D9534F` | Errors, destructive actions |
| Error Light | `#FDECEA` | Light error backgrounds |
| Warning | `#E8A838` | Warnings |
| Info | `#5F8F8B` | Informational messages |

### UI Colors
| Name | Hex | Usage |
|------|-----|-------|
| Border | `#EDE7DB` | Borders, dividers |
| Border Light | `#F5F3EF` | Light borders |

### In Code
```typescript
const colors = {
  // Surfaces
  background: '#FAF9F6',
  backgroundCard: '#FFFFFF',
  backgroundElevated: '#FFFFFF',
  backgroundSecondary: '#EDE7DB',
  
  // Primary
  primary: '#7FB77E',
  primaryLight: '#A8D4A7',
  primaryMuted: '#6A9E69',
  
  // Secondary
  secondary: '#5F8F8B',
  secondaryLight: '#8FBAB7',
  
  // Text
  text: '#2F2F2F',
  textSecondary: '#4A4A4A',
  textMuted: '#6B6B6B',
  textLight: '#8A8A8A',
  
  // UI
  border: '#EDE7DB',
  borderLight: '#F5F3EF',
  
  // Semantic
  success: '#7FB77E',
  error: '#D9534F',
  errorLight: '#FDECEA',
  warning: '#E8A838',
  info: '#5F8F8B',
  
  // Specific
  signOut: '#D9534F',
  accent: '#7FB77E',
  white: '#FFFFFF',
};
```

---

## Typography

| Name | Size | Line Height | Weight | Usage |
|------|------|-------------|--------|-------|
| Display/Title | 28px | 34px | Bold | Screen titles |
| H1 | 24px | 30px | Bold | Major section headers |
| H2 | 20px | 26px | Bold | Section headers |
| H3 | 18px | 24px | Semibold | Subsection headers |
| Body | 16px | 24px | Regular | Body text, inputs |
| Body Small | 15px | 22px | Regular | Secondary body text |
| Caption | 14px | 20px | Regular | Timestamps, hints (minimum readable) |
| Label | 13px | 18px | Regular | UI labels, badges |
| Overline | 12px | 16px | Regular | UI-only elements (tab bar) |

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### Minimum Sizes
- No fonts smaller than 14px for readable text
- 12px and 13px reserved for UI-only elements (tab bar, badges)

---

## Spacing

8px base grid — breathable, minimal layout

| Name | Value | Usage |
|------|-------|-------|
| xxs | 2px | Minimal gaps |
| xs | 4px | Icon gaps, tight spacing |
| sm | 8px | Related elements |
| md | 12px | Default gap |
| lg | 16px | Card padding, standard gap |
| xl | 20px | Screen horizontal padding |
| xxl | 24px | Section spacing |
| xxxl | 32px | Large sections |
| section | 28px | Section spacing |
| pageBottom | 40px | Bottom padding for tab bar clearance |

### Common Values
- Screen padding: 20px (xl)
- Card padding: 16px (lg)
- Input/Button height: 48px (minimum 44px for touch targets)
- Gap between elements: 16px (lg)
- Gap between cards: 12px (md)
- Section spacing: 28px

---

## Border Radius

Rounded corners everywhere — no sharp edges

| Name | Value | Usage |
|------|-------|-------|
| xs | 6px | Small badges |
| sm | 8px | Tags, small elements |
| md | 12px | Buttons, inputs, cards |
| lg | 16px | Large cards |
| xl | 20px | Extra large cards |
| xxl | 24px | Modals, sheets |
| full | 9999px | Pills, avatars |

---

## Shadows

### Subtle (cards)
```typescript
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.05,
shadowRadius: 10,
elevation: 2,
```

### Card Shadow Subtle
```typescript
shadowColor: '#000',
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.03,
shadowRadius: 6,
elevation: 1,
```

### Medium (modals, elevated cards)
```typescript
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.06,
shadowRadius: 8,
elevation: 3,
```

---

## Component Styles

### Primary Button
```typescript
backgroundColor: '#7FB77E',
paddingVertical: 14,
paddingHorizontal: 24,
borderRadius: 12,
minHeight: 48,

// Text
color: '#FFFFFF',
fontSize: 16,
fontWeight: '600',
```

### Secondary Button (Outline)
```typescript
backgroundColor: 'transparent',
borderWidth: 1.5,
borderColor: '#7FB77E',
borderRadius: 12,
paddingVertical: 14,
paddingHorizontal: 24,
minHeight: 48,

// Text
color: '#7FB77E',
fontSize: 16,
fontWeight: '600',
```

### Text Input
```typescript
backgroundColor: '#FFFFFF',
borderWidth: 1,
borderColor: '#EDE7DB',  // Focused: '#7FB77E', Error: '#D9534F'
borderRadius: 12,
paddingHorizontal: 16,
paddingVertical: 14,
fontSize: 16,
color: '#2F2F2F',
```

### Card
```typescript
backgroundColor: '#FFFFFF',
borderRadius: 16,
padding: 16,
// Add subtle shadow
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.05,
shadowRadius: 10,
elevation: 2,
```

### Badge/Tag
```typescript
backgroundColor: '#EDE7DB',
paddingHorizontal: 12,
paddingVertical: 6,
borderRadius: 8,
borderWidth: 1,
borderColor: '#EDE7DB',

// Text
fontSize: 14,
color: '#4A4A4A',
fontWeight: '500',
```

---

## Screen Layouts

### Auth Screens
```typescript
flex: 1,
backgroundColor: '#FAF9F6',
paddingHorizontal: 20,
justifyContent: 'center',
```

### Main Screens
```typescript
flex: 1,
backgroundColor: '#FAF9F6',
paddingHorizontal: 20,
paddingBottom: 100, // For tab bar clearance
```

### Safe Area View
```typescript
// Always use SafeAreaView for proper spacing
edges: ['top'], // or ['top', 'bottom'] as needed
paddingBottom: 100, // Ensure content is above tab bar
```

---

## State Screens

### Loading
- Center an ActivityIndicator
- Color: primary (#7FB77E)
- Add loading text below indicator
- Use textSecondary color for text

```typescript
<View style={styles.loadingContainer}>
  <ActivityIndicator size="large" color={colors.primary} />
  <Text style={styles.loadingText}>Loading...</Text>
</View>
```

### Empty
- Center content
- Large icon (48-64px) in textMuted color
- Message in textSecondary color
- Optional action button in primary color

```typescript
<View style={styles.emptyState}>
  <Ionicons name="document-outline" size={48} color={colors.textMuted} />
  <Text style={styles.emptyText}>No items found</Text>
  <Pressable style={styles.emptyButton}>
    <Text style={styles.emptyButtonText}>Add Item</Text>
  </Pressable>
</View>
```

### Error
- Center content
- Error icon in error color (#D9534F)
- Error message in text color
- "Try Again" button in primary color

```typescript
<View style={styles.errorContainer}>
  <Ionicons name="alert-circle-outline" size={48} color={colors.error} />
  <Text style={styles.errorText}>Something went wrong</Text>
  <Text style={styles.errorSubtext}>Please try again</Text>
  <Pressable style={styles.retryButton}>
    <Text style={styles.retryButtonText}>Try Again</Text>
  </Pressable>
</View>
```

---

## Touch Targets

### Minimum Sizes
- Minimum touch target: 44px (iOS/Android guidelines)
- Standard button height: 52px
- Small button height: 44px (still meets minimum)

### Active States
- Use `activeOpacity={0.7}` for Pressable/TouchableOpacity
- Use `pressed` state for custom styling
- Provide visual feedback on all interactive elements

---

## Design Principles

1. **Calm & Soft**: Use soft colors, rounded corners, subtle shadows
2. **Minimal**: Clean layouts, plenty of whitespace, clear hierarchy
3. **Mobile-first**: Touch-friendly targets, readable text sizes
4. **Consistent**: Use design tokens throughout the app
5. **Accessible**: Minimum 14px text, 44px touch targets, clear contrast

---

## Usage Guidelines

### Colors
- Always use theme colors, never hardcode hex values
- Use opacity variants for subtle backgrounds: `${colors.primary}15` (15% opacity)
- Maintain contrast ratios for accessibility

### Typography
- Never use fonts smaller than 14px for readable text
- Always pair fontSize with lineHeight
- Use appropriate font weights for hierarchy

### Spacing
- Use spacing tokens instead of arbitrary values
- Maintain consistent padding and margins
- Use 8px grid for alignment

### Components
- Follow component style patterns above
- Ensure all interactive elements have proper touch targets
- Add loading, empty, and error states to all data-driven screens
