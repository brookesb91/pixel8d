export interface Editor {
  sprite: {
    name: string;
    pixels: number[][];
    palette: string[];
    height: number;
    width: number;
    size: number;
  };
  activeColorIndex: number;
  isLoading: boolean;
  isLoaded: boolean;
}

export interface EditorParams {
  height?: number;
  width?: number;
  size?: number;
}

export const createInitialState = (
  params: EditorParams = { height: 32, width: 32, size: 10 }
): Editor => ({
  sprite: {
    name: '',
    pixels: new Array(params.height).fill(new Array(params.width).fill(0)),
    palette: ['transparent', 'black'],
    height: params.height,
    width: params.width,
    size: params.size,
  },
  activeColorIndex: 1,
  isLoaded: false,
  isLoading: false,
});
