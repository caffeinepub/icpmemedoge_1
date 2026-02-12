import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Text "mo:core/Text";

actor {
  let presaleTargetIcp : Nat = 515_000_000_000;
  let presaleDepositAddress = "d1850dd067fb2302bd635b0de944dcb52530490348ef1b6210bd4bdb490f0fe9";
  var totalIcpReceived : Nat = 0;
  var presaleActive = true;

  type Contribution = {
    address : Text;
    amount : Nat;
    timestamp : Time.Time;
  };

  type Allocation = {
    address : Text;
    amount : Nat;
  };

  module Contribution {
    public func compareByTimestamp(contribution1 : Contribution, contribution2 : Contribution) : Order.Order {
      Int.compare(contribution2.timestamp, contribution1.timestamp);
    };
  };

  let allocations = Map.empty<Text, Nat>();
  let contributions = Map.empty<Text, [Contribution]>();

  func updateAllocation(address : Text, amount : Nat) {
    let current = switch (allocations.get(address)) {
      case (null) { 0 };
      case (?existing) { existing };
    };
    allocations.add(address, current + amount);
  };

  func recordContribution(address : Text, amount : Nat) {
    let contribution = {
      address;
      amount;
      timestamp = Time.now();
    };

    let existingContributions = switch (contributions.get(address)) {
      case (null) { [] };
      case (?list) { list };
    };

    contributions.add(address, [contribution].concat(existingContributions));
  };

  public shared ({ caller }) func updatePresaleProgress(newAmount : Nat, contributor : Text, depositAddress : Text) : async () {
    if (depositAddress != presaleDepositAddress) {
      Runtime.trap("This transfer does not count toward presale totals. The specified deposit address is not the active presale deposit address. Please send your contribution directly to the provided deposit address.");
    };

    if (not presaleActive) { Runtime.trap("Presale has already ended") };

    if (totalIcpReceived + newAmount > presaleTargetIcp) {
      Runtime.trap("Presale contribution would exceed the cap");
    };

    totalIcpReceived += newAmount;
    updateAllocation(contributor, newAmount);
    recordContribution(contributor, newAmount);

    if (totalIcpReceived >= presaleTargetIcp) {
      presaleActive := false;
    };
  };

  public query ({ caller }) func getPresaleStatus() : async {
    totalIcp : Nat;
    remainingIcp : Nat;
    active : Bool;
    depositAddress : Text;
  } {
    {
      totalIcp = totalIcpReceived;
      remainingIcp = if (totalIcpReceived >= presaleTargetIcp) { 0 } else {
        presaleTargetIcp - totalIcpReceived;
      };
      active = presaleActive;
      depositAddress = presaleDepositAddress;
    };
  };

  public query ({ caller }) func getAllContributionsForAddress(address : Text) : async [Contribution] {
    switch (contributions.get(address)) {
      case (null) { Runtime.trap("No contributions found for this address") };
      case (?contribs) { contribs };
    };
  };

  public query ({ caller }) func getAllContributors() : async [Contribution] {
    var allContribs : [Contribution] = [];

    let iter = contributions.values();

    iter.forEach(
      func(historicContribs) {
        allContribs := allContribs.concat(historicContribs);
      }
    );

    allContribs.sort(Contribution.compareByTimestamp);
  };

  public query ({ caller }) func getTotalAllocation(address : Text) : async Allocation {
    switch (allocations.get(address)) {
      case (null) { Runtime.trap("No allocation found for this address") };
      case (?amount) {
        {
          address;
          amount;
        };
      };
    };
  };
};
