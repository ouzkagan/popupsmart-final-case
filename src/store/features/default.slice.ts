import type { RootState } from '@/store/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

/*
template_id: int? | string?
// Appearance
size: small | medium | large,
position: CENTER_CENTER,
colors: #000000 | ... [option to pick custom?]
logo: image_url,

// Targeting Rules
visitorDevice: {
  desktop: true,
  mobile: false
}
// visitorBehaviour
afterXSeconds: null,
afterScrollingXAmount: null,
urlBrowsing: { 
  include: ['google.com'],
  exclude: ['mywebsite.com'],
  targetAll: false //true first
}
browserLanguage: ['en-US', 'tr-TR']
onExitIntent: {onExitIntentDegree: NONE|MEDIUM, overrideConditions:true}
*/

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

export type PopupSizes = 'SMALL' | 'MEDIUM' | 'LARGE';
export type PopupPositions =
  | 'TOP_CENTER'
  | 'TOP_RIGHT'
  | 'TOP_LEFT'
  | 'CENTER_LEFT'
  | 'CENTER_CENTER'
  | 'CENTER_RIGHT'
  | 'BOTTOM_CENTER'
  | 'BOTTOM_RIGHT'
  | 'BOTTOM_LEFT';
export type VisitorDeviceType = {
  desktop: boolean;
  mobile: boolean;
};
export type UrlSourceType = {
  include: string[];
  exclude: string[];
  targetAll: boolean;
};

interface defaultStateInterface {
  template_id: string;
  // appearance
  size: PopupSizes;
  position: PopupPositions;
  color: Color;
  logo: null | string;
  // Targeting Rules
  visitorDevices: VisitorDeviceType;
  afterXSeconds: null | string;
  afterScrollingXAmount: null | string;
  urlBrowsing: UrlSourceType;
  browserLanguage: string[];
  onExitIntent: boolean;

  // move
  pending: boolean;
  error: boolean;
}

export const initialState: defaultStateInterface = {
  template_id: 't1',
  // appearance
  size: 'MEDIUM',
  position: 'CENTER_CENTER',
  color: '#F37C34',
  logo: null,
  // Targeting Rules
  visitorDevices: {
    desktop: true,
    mobile: false,
  },
  afterXSeconds: null,
  afterScrollingXAmount: null,
  urlBrowsing: {
    include: [],
    exclude: [],
    targetAll: true,
  },
  browserLanguage: ['en-EN'],
  onExitIntent: true,
};

// This action is what we will call using the dispatch in order to trigger the API call.
// export const getPopupTemplates = createAsyncThunk(
//   'defaultForm/popups',
//   async () => {
//     const res = await fetch('https://localhost:3000/api/popups');
//     const popupTemplates = await res.json();

//     return popupTemplates;
//   }
// );

export const defaultFormSlice = createSlice({
  name: 'defaultForm',
  initialState,
  reducers: {
    UPDATE_FORM_STATE: (state, action) => {
      const formName: string = action?.payload?.form;
      console.log(action.payload.state);
      state[formName] = action.payload.state;
    },

    set_template: (
      state,
      { payload }: PayloadAction<defaultStateInterface['template_id']>
    ) => {
      state.template_id = payload;
    },
    set_initial: (state, { payload }: PayloadAction<defaultStateInterface>) => {
      state = payload;
    },
    [HYDRATE]: (state, action) => {
      state = {
        ...state,
        ...action.payload,
      };
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getPopupTemplates.pending, (state) => {
  //       state.pending = true;
  //     })
  //     .addCase(getPopupTemplates.fulfilled, (state, { payload }) => {
  //       // When the API call is successful and we get some data,the data becomes the `fulfilled` action payload
  //       state.pending = false;
  //       state.popups = payload;
  //       console.log('redux: ', state.popups);
  //     })
  //     .addCase(getPopupTemplates.rejected, (state) => {
  //       state.pending = false;
  //       state.error = true;
  //     });
  // },
});

export const { UPDATE_FORM_STATE, set_template } = defaultFormSlice.actions;

export const selectForm = (state: RootState, form: string) => {
  // console.log(state.defaultForm);

  return (state && state.defaultForm && state.defaultForm[form]) || {};
};

// export const popupValues = (state: RootState) => {
//   return (
//     (state && state.defaultForm && state.defaultForm.popupValues?.values) ||
//     (state && state.defaultForm && state.defaultForm)
//   );
// };

export default defaultFormSlice;