import OutCall "http-outcalls/outcall";
import Text "mo:core/Text";

// Use migration logic in with clause.

actor {
  public type SyncHealth = {
    lastSuccessfulSync : ?Text;
    lastSyncAttempt : ?Text;
    syncError : ?Text;
  };

  public func getHealth() : async SyncHealth {
    {
      lastSuccessfulSync = ?"not used";
      lastSyncAttempt = ?"not used";
      syncError = ?"ic.house no longer used";
    };
  };

  // Required by OUTCALL module which remains.
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
