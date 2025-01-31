import React, { FunctionComponent } from 'react';
import { getPadding } from '../../utils';
import { GeneralObserver } from '../general-observer';

export interface IYouTubeProps {
  /** YouTube id */
  youTubeId: string;
  /** Aspect ratio of YouTube video */
  aspectRatio?: '1:1' | '16:9' | '4:3' | '3:2' | '8:5';
  /** Skip to a time in the video */
  skipTo?: {
    h?: number;
    m: number;
    s: number;
  };
  /** Auto play the video */
  autoPlay?: boolean;
  /** No Cookie option */
  noCookie?: boolean;
}

export const YouTube: FunctionComponent<IYouTubeProps> = ({
  youTubeId,
  aspectRatio = '16:9',
  autoPlay = false,
  skipTo = { h: 0, m: 0, s: 0 },
  noCookie = false,
}: IYouTubeProps) => {
  const { h, m, s } = skipTo;

  const tH = h! * 60;
  const tM = m * 60;

  const startTime = tH + tM + s;

  const provider = noCookie ? "www.youtube-nocookie.com" : "www.youtube.com";

  return (
    <GeneralObserver>
      <div
        className="youtube-mdx-embed"
        style={{
          position: 'relative',
          width: '100%',
          ...getPadding(aspectRatio),
        }}
      >
        <iframe
          data-testid="youtube"
          title={`youTube-${youTubeId}`}
          src={`https://${provider}/embed/${youTubeId}?&autoplay=${autoPlay}&start=${startTime}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    </GeneralObserver>
  );
};
