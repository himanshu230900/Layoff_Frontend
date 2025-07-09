# Store

This folder contains the Redux store configuration using Redux Toolkit for global state management.

## Structure

```
store/
├── index.ts          # Store configuration and types
├── hooks.ts          # Typed hooks for Redux
├── slices/           # Redux slices
│   ├── authSlice.ts  # Authentication state
│   └── counterSlice.ts # Counter example
└── README.md         # This file
```

## Usage

### Using the Store

1. **Wrap your app with the Redux Provider** (already done in `main.tsx`)
2. **Use typed hooks** instead of plain Redux hooks:

```typescript
import { useAppDispatch, useAppSelector } from '@/store/hooks';

function MyComponent() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  
  // Use dispatch and selector as needed
}
```

### Creating New Slices

1. Create a new file in the `slices/` folder
2. Define your state interface
3. Create the slice with initial state and reducers
4. Export actions and reducer
5. Add the reducer to the store in `index.ts`

### Example Slice Structure

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MyState {
  // Define your state shape
}

const initialState: MyState = {
  // Initial state values
};

const mySlice = createSlice({
  name: 'mySlice',
  initialState,
  reducers: {
    // Define your reducers here
  },
});

export const { /* action creators */ } = mySlice.actions;
export default mySlice.reducer;
```

## Best Practices

- Use TypeScript for type safety
- Keep slices focused on a single domain
- Use the typed hooks (`useAppDispatch`, `useAppSelector`)
- Use createSlice for better DX and less boilerplate
- Consider using RTK Query for API calls 