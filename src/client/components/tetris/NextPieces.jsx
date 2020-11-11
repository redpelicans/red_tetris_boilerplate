import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { useTranslation } from "react-i18next";

const NextPieces = React.memo(({ nextPieces }) => {
  const { t } = useTranslation();

  return (
    nextPieces && (
      <FlexBox direction="col" className="space-y-4">
        <h1 className="font-bold text-2xl">{t("pages.game.next_pieces")}</h1>
        {nextPieces[0] && (
          <Previsualisation nextPiece={nextPieces[0]} size={4} />
        )}
        {nextPieces[1] && (
          <Previsualisation nextPiece={nextPieces[1]} size={2} />
        )}
      </FlexBox>
    )
  );
});

export default NextPieces;

const Previsualisation = React.memo(({ nextPiece, size }) => {
  const piece = React.useMemo(
    () =>
      nextPiece.shape.map((row) =>
        row.map((col) => (col === 1 ? nextPiece.color : col)),
      ),
    [nextPiece],
  );

  return (
    <FlexBox direction="col" className="items-center mb-4">
      {piece.map((row, rowIdx) => (
        <FlexBox key={`next-piece-row-${rowIdx}`} direction="row" height={size}>
          {row.map((col, colIdx) => (
            <FlexBox
              key={`next-piece-row${rowIdx}-col-${colIdx}`}
              direction="col"
              width={size}
              className={col === 0 ? "" : `tetromino-${col}`}
            />
          ))}
        </FlexBox>
      ))}
    </FlexBox>
  );
});
