export interface Editor {
  pixels: number[][];
  palette: { active: number; colors: string[] };
  height: number;
  width: number;
  size: number;
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
  pixels: new Array(params.height).fill(new Array(params.width).fill(0)),
  palette: { colors: ['transparent', 'black'], active: 1 },
  height: params.height,
  width: params.width,
  size: params.size,
  isLoaded: false,
  isLoading: false,
});
