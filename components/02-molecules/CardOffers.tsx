import { TokenCard, UserOfferInfo } from "@/components/02-molecules";
import { SwapContext, TokenCardProperties } from "@/components/01-atoms";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { EthereumAddress } from "@/lib/shared/types";
import { useContext } from "react";

interface CardOffersProps {
  address: EthereumAddress | null;
}

export const CardOffers = ({ address }: CardOffersProps) => {
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const { authenticatedUserTokensList } = useContext(SwapContext);

  return (
    <div className="md:p-4 ">
      <div className="flex flex-col justify-content gap-4 md:w-[326px]">
        <div>
          <UserOfferInfo address={address} />
        </div>
        <div>
          {authenticatedUserAddress && ( // That div needs change to render the given Tokens by Subgraph, shouldn't be the <TokenCard here/> , for now, just visualization
            <div className="grid md:grid-cols-4 md:gap-4 ">
              {authenticatedUserTokensList.map((token, index) => (
                <TokenCard
                  key={index}
                  withSelectionValidation={false}
                  ownerAddress={authenticatedUserAddress?.address}
                  tokenData={token}
                  styleType="medium"
                />
              ))}
            </div>
          )}
        </div>
        <div>
          <TokenCardProperties properties={{ amount: 2, value: 0.056 }} />
        </div>
      </div>
    </div>
  );
};
